import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { WebSocketServer, WebSocket } from 'ws';
import { subscribe } from 'graphql';
import { schema } from './graphql/schema';
import cors from 'cors';
import bodyParser from 'body-parser';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const expressApp = express();

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  expressApp.use('/graphql', cors(), bodyParser.json(), async (req, res) => {
    try {
      const result = await apolloServer.executeOperation({
        query: req.body.query,
        variables: req.body.variables,
        operationName: req.body.operationName,
      });

      res.setHeader('Content-Type', 'application/json');

      if (result.body.kind === 'single') {
        res.json(result.body.singleResult);
      }
    } catch (error) {
      console.error('GraphQL error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  expressApp.all('*', (req, res) => {
    const parsedUrl = parse(req.url!, true);
    return handle(req, res, parsedUrl);
  });

  const httpServer = createServer(expressApp);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql/subscriptions',
  });

  wsServer.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');

    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'connection_init') {
          ws.send(JSON.stringify({ type: 'connection_ack' }));
        } else if (data.type === 'start') {
          const result = await subscribe({
            schema,
            document: data.payload.query,
            variableValues: data.payload.variables,
          });

          if (Symbol.asyncIterator in result) {
            for await (const value of result) {
              ws.send(
                JSON.stringify({
                  type: 'data',
                  id: data.id,
                  payload: value,
                })
              );
            }
          }
        }
      } catch (error) {
        console.error('WebSocket error:', error);
        ws.send(JSON.stringify({ type: 'error', payload: { message: 'Error' } }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> GraphQL endpoint: http://${hostname}:${port}/graphql`);
    console.log(`> Subscriptions: ws://${hostname}:${port}/graphql/subscriptions`);
  });
});
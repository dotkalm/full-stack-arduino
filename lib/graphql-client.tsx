"use client";

import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    // 👇 HTTP endpoint for queries and mutations
    const httpLink = new HttpLink({
      uri: 'http://localhost:3000/graphql',  // <-- Your API endpoint here
    });

    // 👇 WebSocket endpoint for subscriptions
    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:3000/graphql/subscriptions',  // <-- Your WebSocket endpoint here
      options: {
        reconnect: true,
      },
    });

    // Split traffic: subscriptions go to WebSocket, everything else to HTTP
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
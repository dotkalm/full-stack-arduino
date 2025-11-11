import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const typeDefs = `
  type PoseLandmark {
    x: Float!
    y: Float!
    z: Float!
    visibility: Float!
  }

  type PoseFrame {
    landmarks: [PoseLandmark!]!
    timestamp: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    sendPose(landmarks: [[PoseLandmarkInput!]!]!): Boolean!
  }

  input PoseLandmarkInput {
    x: Float!
    y: Float!
    z: Float!
    visibility: Float!
  }

  type Subscription {
    poseUpdated: PoseFrame!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Pose tracking server ready!',
  },

  Mutation: {
    sendPose: (_: any, { landmarks }: { landmarks: any[][] }) => {
      // Assuming outer array has one frame for now
      const frame = landmarks[0];
      
      pubsub.publish('POSE_UPDATED', {
        poseUpdated: {
          landmarks: frame,
          timestamp: new Date().toISOString(),
        },
      });

      return true;
    },
  },

  Subscription: {
    poseUpdated: {
      subscribe: () => pubsub.asyncIterator(['POSE_UPDATED']),
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
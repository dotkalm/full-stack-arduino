import { gql } from '@apollo/client';

export const SEND_POSE = gql`
  mutation SendPose($landmarks: [[PoseLandmarkInput!]!]!) {
    sendPose(landmarks: $landmarks)
  }
`;

export const POSE_UPDATED = gql`
  subscription OnPoseUpdated {
    poseUpdated {
      landmarks {
        x
        y
        z
        visibility
      }
      timestamp
    }
  }
`;
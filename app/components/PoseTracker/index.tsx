"use client";

import { useMutation, useSubscription } from '@apollo/client/react';
import { useEffect, useRef } from 'react';
import { SEND_POSE, POSE_UPDATED } from '@/lib/graphql-queries';
import { PoseLandmark, getLandmark, type PoseLandmarks } from '@/types/pose';

type SubscriptionDataObject = {
    poseUpdated: {
        landmarks: PoseLandmarks;
        timestamp: string;
    };
};
type SubscriptionData = {
    data: SubscriptionDataObject;
}

export default function PoseTracker() {
  const [sendPose] = useMutation(SEND_POSE);

  // Subscribe to pose updates from other clients
  const { data } = useSubscription(POSE_UPDATED, {
    onData: ({ data: subscriptionData }) => {
      const subscriptionDataTyped = subscriptionData.data as SubscriptionDataObject;
      const pose = subscriptionDataTyped.poseUpdated;
      if (pose) {
        console.log('Received pose update:', pose);
        
        // Type-safe access
        const landmarks = pose.landmarks as PoseLandmarks;
        const nose = getLandmark(landmarks, PoseLandmark.NOSE);
        console.log('Nose position:', nose);
      }
    },
  });

  const handlePoseDetection = async (poseData: PoseLandmarks[]) => {
    try {
      await sendPose({
        variables: {
          landmarks: poseData,
        },
      });
    } catch (error) {
      console.error('Error sending pose:', error);
    }
  };

  // Example: simulate pose data
  useEffect(() => {
    const interval = setInterval(() => {
      // Your actual pose detection would go here
      // For now, using mock data structure
      const mockPose: PoseLandmarks = Array(33).fill({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        visibility: Math.random(),
      }) as any;

      handlePoseDetection([mockPose]);
    }, 100); // Send at 10fps

    return () => clearInterval(interval);
  }, []);

  const poseUpdateData = data as SubscriptionDataObject;
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Pose Tracker</h1>
      <div>
        {poseUpdateData?.poseUpdated && (
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(poseUpdateData.poseUpdated, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
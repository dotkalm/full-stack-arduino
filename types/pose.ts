export enum PoseLandmark {
  NOSE = 0,
  LEFT_EYE_INNER = 1,
  LEFT_EYE = 2,
  LEFT_EYE_OUTER = 3,
  RIGHT_EYE_INNER = 4,
  RIGHT_EYE = 5,
  RIGHT_EYE_OUTER = 6,
  LEFT_EAR = 7,
  RIGHT_EAR = 8,
  MOUTH_LEFT = 9,
  MOUTH_RIGHT = 10,
  LEFT_SHOULDER = 11,
  RIGHT_SHOULDER = 12,
  LEFT_ELBOW = 13,
  RIGHT_ELBOW = 14,
  LEFT_WRIST = 15,
  RIGHT_WRIST = 16,
  LEFT_PINKY = 17,
  RIGHT_PINKY = 18,
  LEFT_INDEX = 19,
  RIGHT_INDEX = 20,
  LEFT_THUMB = 21,
  RIGHT_THUMB = 22,
  LEFT_HIP = 23,
  RIGHT_HIP = 24,
  LEFT_KNEE = 25,
  RIGHT_KNEE = 26,
  LEFT_ANKLE = 27,
  RIGHT_ANKLE = 28,
  LEFT_HEEL = 29,
  RIGHT_HEEL = 30,
  LEFT_FOOT_INDEX = 31,
  RIGHT_FOOT_INDEX = 32,
}

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

// Type-safe tuple with exactly 33 landmarks
export type PoseLandmarks = readonly [
  Landmark, // 0: nose
  Landmark, // 1: left eye (inner)
  Landmark, // 2: left eye
  Landmark, // 3: left eye (outer)
  Landmark, // 4: right eye (inner)
  Landmark, // 5: right eye
  Landmark, // 6: right eye (outer)
  Landmark, // 7: left ear
  Landmark, // 8: right ear
  Landmark, // 9: mouth (left)
  Landmark, // 10: mouth (right)
  Landmark, // 11: left shoulder
  Landmark, // 12: right shoulder
  Landmark, // 13: left elbow
  Landmark, // 14: right elbow
  Landmark, // 15: left wrist
  Landmark, // 16: right wrist
  Landmark, // 17: left pinky
  Landmark, // 18: right pinky
  Landmark, // 19: left index
  Landmark, // 20: right index
  Landmark, // 21: left thumb
  Landmark, // 22: right thumb
  Landmark, // 23: left hip
  Landmark, // 24: right hip
  Landmark, // 25: left knee
  Landmark, // 26: right knee
  Landmark, // 27: left ankle
  Landmark, // 28: right ankle
  Landmark, // 29: left heel
  Landmark, // 30: right heel
  Landmark, // 31: left foot index
  Landmark, // 32: right foot index
];

export interface PoseFrame {
  landmarks: PoseLandmarks;
  timestamp: string;
}

// Helper to access landmarks by name
export function getLandmark(pose: PoseLandmarks, landmark: PoseLandmark): Landmark {
  return pose[landmark];
}
import * as posenet from '@tensorflow-models/posenet';

export function getAngle(p1: {x: number, y: number}, p2: {x: number, y: number}): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export function isPostureCorrect(keypoints: posenet.Keypoint[]): boolean {
  const leftEar = keypoints.find((k: posenet.Keypoint) => k.part === "leftEar");
  const leftShoulder = keypoints.find((k: posenet.Keypoint) => k.part === "leftShoulder");
  const rightEar = keypoints.find((k: posenet.Keypoint) => k.part === "rightEar");
  const rightShoulder = keypoints.find((k: posenet.Keypoint) => k.part === "rightShoulder");

  // Require all points to be detected with high confidence
  if (!leftEar || !leftShoulder || !rightEar || !rightShoulder || 
      leftEar.score < 0.6 || leftShoulder.score < 0.6 || 
      rightEar.score < 0.6 || rightShoulder.score < 0.6) {
    return false;
  }

  const leftEarPos = leftEar.position as {x: number, y: number};
  const leftShoulderPos = leftShoulder.position as {x: number, y: number};
  const rightEarPos = rightEar.position as {x: number, y: number};
  const rightShoulderPos = rightShoulder.position as {x: number, y: number};

  // Calculate horizontal and vertical differences
  const leftXDiff = Math.abs(leftEarPos.x - leftShoulderPos.x);
  const rightXDiff = Math.abs(rightEarPos.x - rightShoulderPos.x);
  const leftYDiff = leftShoulderPos.y - leftEarPos.y;
  const rightYDiff = rightShoulderPos.y - rightEarPos.y;

  // Calculate head tilt
  const earsDeltaY = Math.abs(leftEarPos.y - rightEarPos.y);
  const shouldersDeltaY = Math.abs(leftShoulderPos.y - rightShoulderPos.y);

  // Stricter conditions for good posture
  const isVerticalAlignmentGood = leftXDiff < 60 && rightXDiff < 60;
  const isHeightAppropriate = leftYDiff > 50 && leftYDiff < 150 && rightYDiff > 50 && rightYDiff < 150;
  const isHeadLevel = earsDeltaY < 20; // Head shouldn't be tilted
  const isShouldersLevel = shouldersDeltaY < 30; // Shoulders should be roughly level

  return isVerticalAlignmentGood && isHeightAppropriate && isHeadLevel && isShouldersLevel;
}

export function getPostureInsights(debugInfo: {leftXDiff: number|null, leftYDiff: number|null, rightXDiff: number|null, rightYDiff: number|null, keypoints: posenet.Keypoint[]}): {msg: string, good: boolean}[] {
  const insights: {msg: string, good: boolean}[] = [];
  
  const leftEar = debugInfo.keypoints.find(k => k.part === "leftEar");
  const rightEar = debugInfo.keypoints.find(k => k.part === "rightEar");
  const leftShoulder = debugInfo.keypoints.find(k => k.part === "leftShoulder");
  const rightShoulder = debugInfo.keypoints.find(k => k.part === "rightShoulder");

  // Check if all points are detected with high confidence
  if (!leftEar || !leftShoulder || !rightEar || !rightShoulder || 
      leftEar.score < 0.6 || leftShoulder.score < 0.6 || 
      rightEar.score < 0.6 || rightShoulder.score < 0.6) {
    insights.push({msg: "Please face the camera directly", good: false});
    return insights;
  }

  const leftEarPos = leftEar.position;
  const rightEarPos = rightEar.position;
  const leftShoulderPos = leftShoulder.position;
  const rightShoulderPos = rightShoulder.position;

  // Check head tilt
  const earsDeltaY = Math.abs(leftEarPos.y - rightEarPos.y);
  if (earsDeltaY >= 20) {
    insights.push({msg: "Keep your head level, not tilted", good: false});
  }

  // Check shoulders level
  const shouldersDeltaY = Math.abs(leftShoulderPos.y - rightShoulderPos.y);
  if (shouldersDeltaY >= 30) {
    insights.push({msg: "Keep your shoulders level", good: false});
  }

  // Check vertical alignment
  if (debugInfo.leftXDiff !== null && debugInfo.leftXDiff >= 60) {
    insights.push({msg: "Move your head back - it's too far forward", good: false});
  }

  // Check height
  if (debugInfo.leftYDiff !== null && (debugInfo.leftYDiff <= 50 || debugInfo.leftYDiff >= 150)) {
    insights.push({msg: "Adjust your head height relative to shoulders", good: false});
  }

  if (insights.length === 0) {
    insights.push({msg: "Perfect posture! Keep it up", good: true});
  }

  return insights;
} 
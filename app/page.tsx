'use client'

import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import MainCard from './components/MainCard';
import { getAngle, isPostureCorrect, getPostureInsights } from './utils/posture';
import { useTheme } from './layout';

function Home() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [postureStatus, setPostureStatus] = useState("Detecting...");
  const [isGoodPosture, setIsGoodPosture] = useState(true);
  const [debugInfo, setDebugInfo] = useState<{leftXDiff: number|null, leftYDiff: number|null, rightXDiff: number|null, rightYDiff: number|null, keypoints: posenet.Keypoint[]}>({leftXDiff: null, leftYDiff: null, rightXDiff: null, rightYDiff: null, keypoints: []});

  const runPosenet = async () => {
    const net = await posenet.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.75,
    });

    setInterval(() => {
      detect(net);
    }, 200);
  };

  const detect = async (net: posenet.PoseNet) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: false,
      });

      // Posture logic
      const good = isPostureCorrect(pose.keypoints);
      setIsGoodPosture(good);
      setPostureStatus(good ? "Good Posture" : "Bad Posture");

      const leftEar = pose.keypoints.find((k: posenet.Keypoint) => k.part === "leftEar");
      const leftShoulder = pose.keypoints.find((k: posenet.Keypoint) => k.part === "leftShoulder");
      const rightEar = pose.keypoints.find((k: posenet.Keypoint) => k.part === "rightEar");
      const rightShoulder = pose.keypoints.find((k: posenet.Keypoint) => k.part === "rightShoulder");
      let leftXDiff = null, leftYDiff = null;
      let rightXDiff = null, rightYDiff = null;
      if (leftEar && leftShoulder && leftEar.score > 0.5 && leftShoulder.score > 0.5) {
        const earPos = leftEar.position as {x: number, y: number};
        const shPos = leftShoulder.position as {x: number, y: number};
        leftXDiff = Math.abs(earPos.x - shPos.x);
        leftYDiff = shPos.y - earPos.y;
      }
      if (rightEar && rightShoulder && rightEar.score > 0.5 && rightShoulder.score > 0.5) {
        const earPos = rightEar.position as {x: number, y: number};
        const shPos = rightShoulder.position as {x: number, y: number};
        rightXDiff = Math.abs(earPos.x - shPos.x);
        rightYDiff = shPos.y - earPos.y;
      }
      setDebugInfo({leftXDiff, leftYDiff, rightXDiff, rightYDiff, keypoints: pose.keypoints});

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (
    pose: posenet.Pose,
    video: HTMLVideoElement,
    videoWidth: number,
    videoHeight: number,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>
  ) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !canvas.current) return;

    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose.keypoints, 0.6, ctx);
    drawSkeleton(pose.keypoints, 0.7, ctx);
  };

  useEffect(() => {
    runPosenet();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-middle) 50%, var(--gradient-end) 100%)`
      }}>
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute w-[32rem] h-[32rem] bg-purple-500 opacity-30 rounded-full blur-3xl animate-blob1 left-10 top-10" />
        <div className="absolute w-[28rem] h-[28rem] bg-blue-400 opacity-20 rounded-full blur-2xl animate-blob2 right-20 top-40" />
        <div className="absolute w-[24rem] h-[24rem] bg-pink-400 opacity-20 rounded-full blur-2xl animate-blob3 left-1/2 bottom-10" />
      </div>
      <MainCard
        isGoodPosture={isGoodPosture}
        postureStatus={postureStatus}
        insights={getPostureInsights(debugInfo)}
        webcamRef={webcamRef}
        canvasRef={canvasRef}
      />
      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes blob1 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-30px) scale(1.1);} }
        @keyframes blob2 { 0%,100%{transform:translateX(0) scale(1);} 50%{transform:translateX(30px) scale(1.1);} }
        @keyframes blob3 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(30px) scale(1.1);} }
        .animate-blob1 { animation: blob1 12s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 14s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 16s ease-in-out infinite; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95) translateY(20px);} to { opacity: 1; transform: scale(1) translateY(0);} }
      `}</style>
    </div>
  );
}

export default Home;

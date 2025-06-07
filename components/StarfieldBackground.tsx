"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // Unique stars
    const stars = [
      { x: 200, y: 150, r: 4, color: "#FFD700", dx: 0.04, dy: 0.02 },
      { x: 600, y: 300, r: 6, color: "#00BFFF", dx: -0.03, dy: 0.01 },
      { x: 900, y: 100, r: 5, color: "#FF69B4", dx: 0.02, dy: -0.03 },
      { x: 1200, y: 400, r: 7, color: "#ADFF2F", dx: -0.02, dy: 0.04 },
      { x: 400, y: 600, r: 5, color: "#FF4500", dx: 0.03, dy: -0.02 },
      { x: 1000, y: 500, r: 6, color: "#FFFFFF", dx: -0.01, dy: 0.03 },
    ];

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Animate
        star.x += star.dx;
        star.y += star.dy;
        // Bounce off edges
        if (star.x < star.r || star.x > window.innerWidth - star.r) star.dx *= -1;
        if (star.y < star.r || star.y > window.innerHeight - star.r) star.dy *= -1;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [theme, systemTheme]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      />
    </div>
  );
} 
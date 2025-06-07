"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function EntangledSpheres({ onSplit }) {
  const leftRef = useRef();
  const rightRef = useRef();
  const { size, camera } = useThree();
  const [radius, setRadius] = useState(0);
  const [split, setSplit] = useState(false);
  // 2D projected positions
  const [left2D, setLeft2D] = useState({ x: size.width / 4, y: size.height / 2 });
  const [right2D, setRight2D] = useState({ x: (3 * size.width) / 4, y: size.height / 2 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const r = Math.min(40 * (t + 0.5), size.height * 0.4); // animate radius up to 40vh
    setRadius(r);
    // Circular orbits
    const angle = t * 1.2;
    const leftPos = [Math.cos(angle) * 2, Math.sin(angle) * 2, 0];
    const rightPos = [Math.cos(angle + Math.PI) * 2, Math.sin(angle + Math.PI) * 2, 0];
    if (leftRef.current && rightRef.current) {
      leftRef.current.position.set(...leftPos);
      rightRef.current.position.set(...rightPos);
      // Project to 2D
      const leftProjected = leftRef.current.position.clone().project(camera);
      const rightProjected = rightRef.current.position.clone().project(camera);
      setLeft2D({
        x: ((leftProjected.x + 1) / 2) * size.width,
        y: ((-leftProjected.y + 1) / 2) * size.height,
      });
      setRight2D({
        x: ((rightProjected.x + 1) / 2) * size.width,
        y: ((-rightProjected.y + 1) / 2) * size.height,
      });
    }
    if (r >= size.height * 0.4 && !split) {
      setSplit(true);
      setTimeout(onSplit, 1200);
    }
  });

  return (
    <>
      <mesh ref={leftRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={rightRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.7} />
      </mesh>
    </>
  );
}

export default function QuantumSplitIntro({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [leftMask, setLeftMask] = useState({ x: "25vw", y: "50vh", r: 0 });
  const [rightMask, setRightMask] = useState({ x: "75vw", y: "50vh", r: 0 });

  // Animate mask radius up
  useEffect(() => {
    if (!showIntro) return;
    let start;
    function animateMask(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      const r = Math.min(40 * (elapsed + 0.5), window.innerHeight * 0.4);
      setLeftMask((m) => ({ ...m, r }));
      setRightMask((m) => ({ ...m, r }));
      if (r < window.innerHeight * 0.4) requestAnimationFrame(animateMask);
    }
    requestAnimationFrame(animateMask);
  }, [showIntro]);

  // When split, animate shutters off-screen
  const [split, setSplit] = useState(false);
  function handleSplit() {
    setSplit(true);
    setTimeout(() => setShowIntro(false), 1200);
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: "auto",
            background: "transparent",
          }}
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 60 }} style={{ position: "absolute", inset: 0 }}>
            <ambientLight intensity={0.7} />
            <EntangledSpheres onSplit={handleSplit} />
          </Canvas>
          {/* Left Shutter */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{
              x: split ? "-100%" : "0%",
              transition: { duration: 1, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50vw",
              height: "100vh",
              background: "var(--background, #181c2a)",
              WebkitClipPath: `circle(${leftMask.r}px at ${leftMask.x} ${leftMask.y})`,
              clipPath: `circle(${leftMask.r}px at ${leftMask.x} ${leftMask.y})`,
              zIndex: 51,
            }}
          />
          {/* Right Shutter */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{
              x: split ? "100%" : "0%",
              transition: { duration: 1, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50vw",
              height: "100vh",
              background: "var(--background, #181c2a)",
              WebkitClipPath: `circle(${rightMask.r}px at ${rightMask.x} ${rightMask.y})`,
              clipPath: `circle(${rightMask.r}px at ${rightMask.x} ${rightMask.y})`,
              zIndex: 51,
            }}
          />
        </motion.div>
      )}
      {!showIntro && children}
    </AnimatePresence>
  );
} 
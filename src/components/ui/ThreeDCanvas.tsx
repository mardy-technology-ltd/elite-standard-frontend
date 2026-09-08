"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ThreeDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<"all" | "hvac" | "electrical" | "plumbing">("all");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for 3D Isometric tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetTiltY = (x / width) * 0.25;
      targetTiltX = (y / height) * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Isometric Projection Math
    const toIso = (x: number, y: number, z: number) => {
      const isoX = (x - y) * Math.cos(Math.PI / 6);
      const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
      return {
        x: width / 2 + isoX + tiltY * 40,
        y: height / 2 + 30 + isoY + tiltX * 40,
      };
    };

    // MEP System Stream Particles
    interface FlowParticle {
      type: "hvac" | "electrical" | "plumbing";
      floor: number; // 0: Basement, 1: Ground, 2: Mid, 3: Roof
      progress: number; // 0 to 1
      speed: number;
      offset: number;
    }

    const particles: FlowParticle[] = [];

    // Populate flow particles for each MEP discipline
    for (let i = 0; i < 45; i++) {
      particles.push({
        type: i % 3 === 0 ? "hvac" : i % 3 === 1 ? "electrical" : "plumbing",
        floor: Math.floor(Math.random() * 4),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        offset: (Math.random() - 0.5) * 40,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Smooth tilt interpolation
      tiltX += (targetTiltX - tiltX) * 0.05;
      tiltY += (targetTiltY - tiltY) * 0.05;

      const buildingSize = Math.min(width, height) * 0.36;
      const floorHeight = buildingSize * 0.35;
      const floors = 4; // Basement, Floor 1, Floor 2, Rooftop Chiller

      // Draw Isometric Grid Floors & Wireframe Building
      for (let f = 0; f < floors; f++) {
        const z = f * floorHeight;
        const half = buildingSize / 2;

        const p1 = toIso(-half, -half, z);
        const p2 = toIso(half, -half, z);
        const p3 = toIso(half, half, z);
        const p4 = toIso(-half, half, z);

        // Floor Slab Background Fill
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();

        const isRoof = f === floors - 1;
        const isBasement = f === 0;

        ctx.fillStyle = isRoof
          ? "rgba(15, 23, 42, 0.45)"
          : isBasement
          ? "rgba(30, 41, 59, 0.6)"
          : "rgba(15, 23, 42, 0.35)";
        ctx.fill();

        // Floor Border Grid Lines
        ctx.strokeStyle = isRoof
          ? "rgba(56, 189, 248, 0.4)"
          : isBasement
          ? "rgba(245, 158, 11, 0.4)"
          : "rgba(148, 163, 184, 0.25)";
        ctx.lineWidth = isRoof ? 1.5 : 1;
        ctx.stroke();

        // Vertical Pillar Support Columns
        if (f < floors - 1) {
          const zNext = (f + 1) * floorHeight;
          const corners = [
            [-half, -half],
            [half, -half],
            [half, half],
            [-half, half],
          ];

          corners.forEach(([cx, cy]) => {
            const bot = toIso(cx, cy, z);
            const top = toIso(cx, cy, zNext);

            ctx.beginPath();
            ctx.moveTo(bot.x, bot.y);
            ctx.lineTo(top.x, top.y);
            ctx.strokeStyle = "rgba(71, 85, 105, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }
      }

      // Draw Main Vertical Riser Core (Busbar & Piping Conduit)
      const coreBot = toIso(0, 0, 0);
      const coreTop = toIso(0, 0, (floors - 1) * floorHeight);

      // HVAC Vertical Line (Cool Blue)
      ctx.beginPath();
      ctx.moveTo(coreBot.x - 12, coreBot.y);
      ctx.lineTo(coreTop.x - 12, coreTop.y);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Electrical Busbar Line (Amber Gold)
      ctx.beginPath();
      ctx.moveTo(coreBot.x, coreBot.y);
      ctx.lineTo(coreTop.x, coreTop.y);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Plumbing Vertical Riser (Cyan Water)
      ctx.beginPath();
      ctx.moveTo(coreBot.x + 12, coreBot.y);
      ctx.lineTo(coreTop.x + 12, coreTop.y);
      ctx.strokeStyle = "rgba(20, 184, 166, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Update & Render Animated Flow Particles (HVAC, Power, Plumbing)
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const maxZ = (floors - 1) * floorHeight;
        let zPos = p.progress * maxZ;
        let xOffset = 0;
        let yOffset = 0;

        let color = "#38bdf8";
        let shadowColor = "#0284c7";

        if (p.type === "hvac") {
          // Flow from Rooftop Chiller downwards
          zPos = (1 - p.progress) * maxZ;
          xOffset = -12 + Math.sin(time * 3 + p.offset) * 8;
          color = "#38bdf8"; // Sky Blue
          shadowColor = "#38bdf8";
        } else if (p.type === "electrical") {
          // High voltage power pulses upwards from basement switchgear
          zPos = p.progress * maxZ;
          xOffset = Math.sin(time * 4 + p.offset) * 4;
          color = "#f59e0b"; // Amber Gold
          shadowColor = "#f59e0b";
        } else if (p.type === "plumbing") {
          // Water pressure rising from basement booster pumps
          zPos = p.progress * maxZ;
          xOffset = 12 + Math.cos(time * 3 + p.offset) * 8;
          color = "#14b8a6"; // Teal
          shadowColor = "#14b8a6";
        }

        const pos = toIso(xOffset, yOffset, zPos);

        // Render Glowing Energy Node
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = shadowColor;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Rooftop Equipment Icon (Chiller/AHU Array)
      const roofPos = toIso(0, 0, (floors - 1) * floorHeight);
      ctx.fillStyle = "#38bdf8";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#38bdf8";
      ctx.beginPath();
      ctx.arc(roofPos.x - 12, roofPos.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Basement Equipment Icon (Switchgear & Pumps)
      const basePos = toIso(0, 0, 0);
      ctx.fillStyle = "#f59e0b";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#f59e0b";
      ctx.beginPath();
      ctx.arc(basePos.x, basePos.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0 pointer-events-none z-0 opacity-90"
    />
  );
}


"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeDCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    // Pulled farther back for an expansive, fully centered view with plenty of breathing room
    camera.position.set(11.5, 19.0, 44.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Interactive Controls (Zoom disabled to prevent accidental zooming)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 9.2, 0);
    controls.enableZoom = false; // Zooming is completely disabled
    controls.enablePan = false;  // Disables accidental panning off-screen
    controls.autoRotate = false; // Locked to the exact visual orientation requested
    controls.maxPolarAngle = Math.PI / 2 + 0.02;

    // 3. Realistic Architectural Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xe0f2fe, 1.5);
    scene.add(ambientLight);

    // Primary Sun Light (Directional with sharp architectural contrast)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(26, 42, 28);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Cool Blue Rim Backlight (Creates the distinctive glowing column edges)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    rimLight.position.set(-28, 22, -26);
    scene.add(rimLight);

    // Warm Front Fill
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
    fillLight.position.set(0, 14, 30);
    scene.add(fillLight);

    // 4. Ground Neon Grid & Base Platform
    const gridHelper = new THREE.GridHelper(36, 18, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Dark sleek foundation slab
    const baseGeo = new THREE.BoxGeometry(15, 0.25, 15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x091224,
      roughness: 0.7,
      metalness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.125;
    scene.add(baseMesh);

    // Glowing Neon Blue perimeter outline
    const baseEdges = new THREE.EdgesGeometry(baseGeo);
    const baseLine = new THREE.LineSegments(
      baseEdges,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    baseLine.position.y = -0.125;
    scene.add(baseLine);

    // ========================================================
    // 5. ARCHITECTURAL SKELETAL BUILDING (MATCHING REFERENCE)
    // ========================================================
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    const FLOORS = 8;
    const FLOOR_HEIGHT = 2.15;
    const TOTAL_HEIGHT = FLOORS * FLOOR_HEIGHT;
    const BUILDING_WIDTH = 11.2;
    const BUILDING_DEPTH = 11.2;

    // Materials
    // Realistic Architectural Concrete (Light Grey / Off-White)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xc8d3df,
      roughness: 0.38,
      metalness: 0.12,
    });

    // Dark Concrete Core Material (Elevator / Stair shaft)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2,
    });

    // Balcony Glass Material (Semi-transparent cyan architectural safety glass)
    const glassRailingMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.82,
      transparent: true,
      opacity: 0.42,
      reflectivity: 0.85,
    });

    // Stainless Steel Handrails & Baluster Posts
    const metalTrimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.2,
    });

    // 5.1 Central Structural Core (Service Shaft for MEP vertical risers)
    const coreWidth = 3.6;
    const coreDepth = 3.6;
    const coreGeo = new THREE.BoxGeometry(coreWidth, TOTAL_HEIGHT + 0.4, coreDepth);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, (TOTAL_HEIGHT + 0.4) / 2, 0);
    buildingGroup.add(coreMesh);

    // 5.2 Floor Slabs, Balconies & Railings for each level
    const slabThickness = 0.3;
    const slabGeo = new THREE.BoxGeometry(BUILDING_WIDTH, slabThickness, BUILDING_DEPTH);

    for (let f = 0; f <= FLOORS; f++) {
      const floorY = f * FLOOR_HEIGHT;

      // Concrete Floor Slab
      const slab = new THREE.Mesh(slabGeo, concreteMat);
      slab.position.set(0, floorY, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      buildingGroup.add(slab);

      // Glass Balcony Railings & Handrails (Floors 1 through 8)
      if (f < FLOORS && f > 0) {
        const railHeight = 0.68;
        const railY = floorY + slabThickness / 2 + railHeight / 2;
        const halfW = BUILDING_WIDTH / 2;
        const halfD = BUILDING_DEPTH / 2;

        // Front & Back Glass Panels
        const fbGlassGeo = new THREE.BoxGeometry(BUILDING_WIDTH - 0.4, railHeight, 0.05);
        const frontGlass = new THREE.Mesh(fbGlassGeo, glassRailingMat);
        frontGlass.position.set(0, railY, halfD - 0.12);
        buildingGroup.add(frontGlass);

        const backGlass = new THREE.Mesh(fbGlassGeo, glassRailingMat);
        backGlass.position.set(0, railY, -halfD + 0.12);
        buildingGroup.add(backGlass);

        // Left & Right Glass Panels
        const lrGlassGeo = new THREE.BoxGeometry(0.05, railHeight, BUILDING_DEPTH - 0.4);
        const leftGlass = new THREE.Mesh(lrGlassGeo, glassRailingMat);
        leftGlass.position.set(-halfW + 0.12, railY, 0);
        buildingGroup.add(leftGlass);

        const rightGlass = new THREE.Mesh(lrGlassGeo, glassRailingMat);
        rightGlass.position.set(halfW - 0.12, railY, 0);
        buildingGroup.add(rightGlass);

        // Steel Top Handrails
        const fbRailGeo = new THREE.BoxGeometry(BUILDING_WIDTH - 0.3, 0.06, 0.08);
        const frontRail = new THREE.Mesh(fbRailGeo, metalTrimMat);
        frontRail.position.set(0, railY + railHeight / 2, halfD - 0.12);
        buildingGroup.add(frontRail);

        const backRail = new THREE.Mesh(fbRailGeo, metalTrimMat);
        backRail.position.set(0, railY + railHeight / 2, -halfD + 0.12);
        buildingGroup.add(backRail);

        const lrRailGeo = new THREE.BoxGeometry(0.08, 0.06, BUILDING_DEPTH - 0.3);
        const leftRail = new THREE.Mesh(lrRailGeo, metalTrimMat);
        leftRail.position.set(-halfW + 0.12, railY + railHeight / 2, 0);
        buildingGroup.add(leftRail);

        const rightRail = new THREE.Mesh(lrRailGeo, metalTrimMat);
        rightRail.position.set(halfW - 0.12, railY + railHeight / 2, 0);
        buildingGroup.add(rightRail);
      }
    }

    // 5.3 Concrete Structural Columns (5x5 Perimeter Grid -> 4 equal bays per face)
    const colWidth = 0.42;
    const colDepth = 0.42;
    const colGeo = new THREE.BoxGeometry(colWidth, TOTAL_HEIGHT, colDepth);

    // 5 distinct column coordinates dividing 11.2 into 4 equal bays: -5.1, -2.55, 0, 2.55, 5.1
    const colXCoords = [-5.1, -2.55, 0, 2.55, 5.1];
    const colZCoords = [-5.1, -2.55, 0, 2.55, 5.1];

    colXCoords.forEach((x, xi) => {
      colZCoords.forEach((z, zi) => {
        // Place columns along all 4 perimeter faces
        const isPerimeter =
          xi === 0 ||
          xi === colXCoords.length - 1 ||
          zi === 0 ||
          zi === colZCoords.length - 1;

        if (isPerimeter) {
          const col = new THREE.Mesh(colGeo, concreteMat);
          col.position.set(x, TOTAL_HEIGHT / 2, z);
          col.castShadow = true;
          col.receiveShadow = true;
          buildingGroup.add(col);
        }
      });
    });

    // 5.4 Perimeter Concrete Beams (Connecting columns under each floor slab)
    const beamHeight = 0.35;
    const beamDepth = 0.38;

    for (let f = 1; f <= FLOORS; f++) {
      const beamY = f * FLOOR_HEIGHT - beamHeight / 2 - slabThickness / 2;

      // Front & Back beams
      const fbBeamGeo = new THREE.BoxGeometry(BUILDING_WIDTH, beamHeight, beamDepth);
      const frontBeam = new THREE.Mesh(fbBeamGeo, concreteMat);
      frontBeam.position.set(0, beamY, BUILDING_DEPTH / 2 - beamDepth / 2);
      frontBeam.castShadow = true;
      buildingGroup.add(frontBeam);

      const backBeam = new THREE.Mesh(fbBeamGeo, concreteMat);
      backBeam.position.set(0, beamY, -BUILDING_DEPTH / 2 + beamDepth / 2);
      backBeam.castShadow = true;
      buildingGroup.add(backBeam);

      // Left & Right beams
      const lrBeamGeo = new THREE.BoxGeometry(beamDepth, beamHeight, BUILDING_DEPTH);
      const leftBeam = new THREE.Mesh(lrBeamGeo, concreteMat);
      leftBeam.position.set(-BUILDING_WIDTH / 2 + beamDepth / 2, beamY, 0);
      leftBeam.castShadow = true;
      buildingGroup.add(leftBeam);

      const rightBeam = new THREE.Mesh(lrBeamGeo, concreteMat);
      rightBeam.position.set(BUILDING_WIDTH / 2 - beamDepth / 2, beamY, 0);
      rightBeam.castShadow = true;
      buildingGroup.add(rightBeam);
    }

    // 5.5 Ground Floor Mechanical Plant Room (Louvered enclosure at the base)
    const plantRoomGeo = new THREE.BoxGeometry(4.8, 1.8, 4.2);
    const plantRoomMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.4,
      roughness: 0.5,
    });
    const plantRoom = new THREE.Mesh(plantRoomGeo, plantRoomMat);
    plantRoom.position.set(-2.2, 0.9 + slabThickness / 2, -1.8);
    buildingGroup.add(plantRoom);

    // 5.6 Rooftop Architecture & Heavy MEP Equipment (Matching Reference Image)
    const roofY = TOTAL_HEIGHT + slabThickness / 2;

    // Rooftop Parapet Wall
    const parapetHeight = 0.55;
    const parapetGeo = new THREE.BoxGeometry(BUILDING_WIDTH, parapetHeight, 0.3);
    const frontParapet = new THREE.Mesh(parapetGeo, concreteMat);
    frontParapet.position.set(0, roofY + parapetHeight / 2, BUILDING_DEPTH / 2 - 0.15);
    buildingGroup.add(frontParapet);

    const backParapet = new THREE.Mesh(parapetGeo, concreteMat);
    backParapet.position.set(0, roofY + parapetHeight / 2, -BUILDING_DEPTH / 2 + 0.15);
    buildingGroup.add(backParapet);

    // Rooftop Penthouse (Elevator Motor Room / Mechanical Control Room)
    const penthouseGeo = new THREE.BoxGeometry(4.8, 2.0, 4.4);
    const penthouse = new THREE.Mesh(penthouseGeo, concreteMat);
    penthouse.position.set(1.0, roofY + 1.0, 0.2);
    penthouse.castShadow = true;
    buildingGroup.add(penthouse);

    // Penthouse Roof Slab
    const penthouseRoofGeo = new THREE.BoxGeometry(5.2, 0.2, 4.8);
    const penthouseRoof = new THREE.Mesh(penthouseRoofGeo, concreteMat);
    penthouseRoof.position.set(1.0, roofY + 2.1, 0.2);
    buildingGroup.add(penthouseRoof);

    // Rooftop Chillers (Horizontal industrial cylinders)
    const chillerMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.25,
    });
    const chillerGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.6, 20);
    [-2.8, -0.6].forEach((zPos) => {
      const chiller = new THREE.Mesh(chillerGeo, chillerMat);
      chiller.rotation.z = Math.PI / 2;
      chiller.position.set(-2.8, roofY + 0.8, zPos);
      chiller.castShadow = true;
      buildingGroup.add(chiller);

      // Chiller mounting legs
      const legGeo = new THREE.BoxGeometry(0.2, 0.4, 0.6);
      const leg1 = new THREE.Mesh(legGeo, metalTrimMat);
      leg1.position.set(-3.8, roofY + 0.2, zPos);
      buildingGroup.add(leg1);
      const leg2 = new THREE.Mesh(legGeo, metalTrimMat);
      leg2.position.set(-1.8, roofY + 0.2, zPos);
      buildingGroup.add(leg2);
    });

    // Rooftop Cooling Towers (Vertical cylinders with top fans)
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.5,
      roughness: 0.35,
    });
    const towerGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 20);
    [-2.8, 2.8].forEach((xPos) => {
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(xPos, roofY + 0.9, 2.6);
      tower.castShadow = true;
      buildingGroup.add(tower);

      // Top fan cowling
      const fanGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.3, 20);
      const fanMesh = new THREE.Mesh(fanGeo, metalTrimMat);
      fanMesh.position.set(xPos, roofY + 1.95, 2.6);
      buildingGroup.add(fanMesh);
    });

    // ========================================================
    // 6. DETAILED MEP PIPELINES & GENTLE GLOWING ELECTRONS
    // ========================================================
    const mepGroup = new THREE.Group();
    scene.add(mepGroup);

    interface PulseData {
      mesh: THREE.Mesh;
      offset: number;
      speed: number;
      light?: THREE.PointLight;
    }

    interface PipelineSystem {
      curve: THREE.CatmullRomCurve3;
      pulses: PulseData[];
    }

    const systems: PipelineSystem[] = [];

    // Helper: Build 3D Pipe with Couplings and Glowing Electron Particles
    const buildPipeline = (
      points: THREE.Vector3[],
      pipeColor: number,
      glowColor: number,
      radius = 0.24,
      electronCount = 14,
      speed = 0.09
    ) => {
      const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.08);
      const pipeGeo = new THREE.TubeGeometry(curve, 140, radius, 14, false);
      const pipeMat = new THREE.MeshStandardMaterial({
        color: pipeColor,
        metalness: 0.75,
        roughness: 0.22,
        emissive: pipeColor,
        emissiveIntensity: 0.28,
      });

      const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
      pipeMesh.castShadow = true;
      mepGroup.add(pipeMesh);

      // Industrial Couplings along pipe segments
      const jointGeo = new THREE.TorusGeometry(radius * 1.35, radius * 0.35, 10, 16);
      const jointMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.85,
        roughness: 0.2,
      });

      points.forEach((pt, idx) => {
        if (idx > 0 && idx < points.length - 1) {
          const joint = new THREE.Mesh(jointGeo, jointMat);
          joint.position.copy(pt);
          mepGroup.add(joint);
        }
      });

      // Glowing Electron Spheres rushing through the pipeline
      const pulseGeo = new THREE.SphereGeometry(radius * 1.5, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });

      const pulses: PulseData[] = [];

      for (let i = 0; i < electronCount; i++) {
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        mepGroup.add(pulse);

        // Point light on select electrons to illuminate surrounding concrete
        let light: THREE.PointLight | undefined;
        if (i % 3 === 0) {
          light = new THREE.PointLight(glowColor, 2.8, 3.8);
          mepGroup.add(light);
        }

        pulses.push({
          mesh: pulse,
          offset: i / electronCount,
          speed: speed * (0.9 + Math.random() * 0.2), // gentle uniform speed
          light,
        });
      }

      systems.push({ curve, pulses });
    };

    // --- MEP PIPELINES MATCHING THE REFERENCE IMAGE EXACTLY ---

    // 1. Red Fire Fighting & Suppression Riser (Prominent front vertical + horizontal loops)
    buildPipeline(
      [
        new THREE.Vector3(-2.55, 0.2, 3.8),
        new THREE.Vector3(-2.55, 6.4, 3.8), // Floor 3 branch
        new THREE.Vector3(-4.4, 6.4, 3.8),
        new THREE.Vector3(-4.4, 10.7, 1.8), // Floor 5 riser
        new THREE.Vector3(2.55, 10.7, 1.8),
        new THREE.Vector3(2.55, 15.0, 3.2), // Floor 7 riser
        new THREE.Vector3(-2.55, 15.0, 3.2),
        new THREE.Vector3(-2.55, roofY + 0.4, 0.5),
        new THREE.Vector3(1.0, roofY + 0.4, 0.5), // Enters penthouse
      ],
      0xdc2626, // Vivid Red Pipe
      0xef4444, // Red Glow
      0.26,
      15,
      0.09 // Gentle, smooth elegant flow
    );

    // 2. Central Blue/Cyan HVAC Chilled Water System (Winding across multiple levels to chillers)
    buildPipeline(
      [
        new THREE.Vector3(-2.8, 0.2, -1.8), // From ground plant room
        new THREE.Vector3(-2.8, 4.3, -1.8), // Floor 2
        new THREE.Vector3(3.2, 4.3, -1.8),
        new THREE.Vector3(3.2, 8.6, 2.6), // Floor 4
        new THREE.Vector3(-2.5, 8.6, 2.6),
        new THREE.Vector3(-2.5, 12.9, -2.2), // Floor 6
        new THREE.Vector3(2.55, 12.9, -2.2),
        new THREE.Vector3(2.55, roofY + 0.4, -2.8),
        new THREE.Vector3(-2.8, roofY + 0.8, -2.8), // Connects to rooftop chiller
      ],
      0x0284c7, // Sky Blue Pipe
      0x38bdf8, // Cyan Glow
      0.28,
      16,
      0.08
    );

    // 3. Orange/Gold Electrical HT/LT Power Busduct (Right vertical riser with floor feeds)
    buildPipeline(
      [
        new THREE.Vector3(3.8, 0.2, 2.2),
        new THREE.Vector3(3.8, 6.4, 2.2),
        new THREE.Vector3(1.2, 6.4, 3.8),
        new THREE.Vector3(1.2, 12.9, 3.8),
        new THREE.Vector3(3.8, 12.9, 0.8),
        new THREE.Vector3(3.8, 17.2, 0.8),
        new THREE.Vector3(1.0, 17.2, 0.8),
      ],
      0xd97706, // Amber/Gold Pipe
      0xfbbf24, // Gold Glow
      0.24,
      14,
      0.10 // Smooth electric flow
    );

    // 4. Green Smart BMS Automation & Drainage Line (Interior vertical core)
    buildPipeline(
      [
        new THREE.Vector3(0.0, 0.2, -2.8),
        new THREE.Vector3(0.0, 6.4, -2.8),
        new THREE.Vector3(-2.2, 6.4, 0.5),
        new THREE.Vector3(-2.2, 12.9, 0.5),
        new THREE.Vector3(2.2, 12.9, -1.2),
        new THREE.Vector3(2.2, 17.2, -1.2),
        new THREE.Vector3(0.0, 17.2, -1.2),
      ],
      0x059669, // Emerald Pipe
      0x34d399, // Green Glow
      0.22,
      13,
      0.08
    );

    // 5. Horizontal Chilled Water Floor Distribution Ring (Mid-Level Floor 4)
    buildPipeline(
      [
        new THREE.Vector3(-3.8, 8.6, -3.8),
        new THREE.Vector3(3.8, 8.6, -3.8),
        new THREE.Vector3(3.8, 8.6, 3.8),
        new THREE.Vector3(-3.8, 8.6, 3.8),
        new THREE.Vector3(-3.8, 8.6, -3.8),
      ],
      0x0ea5e9, // Bright Cyan
      0x7dd3fc,
      0.18,
      12,
      0.07
    );

    // 7. Animation Loop (Gentle Electron Movement & Turntable)
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Move electrons along 3D pipe curves
      systems.forEach((sys) => {
        sys.pulses.forEach((p) => {
          const t = (elapsedTime * p.speed + p.offset) % 1;
          const pos = sys.curve.getPointAt(t);
          if (pos) {
            p.mesh.position.copy(pos);
            if (p.light) {
              p.light.position.copy(pos);
            }
          }
        });
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
    />
  );
}

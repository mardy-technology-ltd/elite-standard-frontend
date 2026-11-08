"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeDCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile screen or touch device for hardware optimization
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ));

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    // Lowered perspective gazing upwards towards the towering building, perfectly framed with snug, natural spacing
    camera.position.set(11.5, 11.2, 43.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable on mobile to prevent GPU thermal throttling
      alpha: true,
      powerPreference: isMobile ? "default" : "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18; // Balanced natural brightness

    // Shadows enabled only on desktop
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else {
      renderer.shadowMap.enabled = false;
    }

    // Set touchAction to pan-y so vertical scrolling works seamlessly
    renderer.domElement.style.touchAction = "pan-y";
    container.appendChild(renderer.domElement);

    // 2. Interactive Controls (Continuous Horizontal 360° Turntable, Vertical Tilt Locked)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 8.8, 0); // Natural center framing leaving a tight, elegant cushion above text
    controls.enableZoom = false; // Zooming is completely disabled
    controls.enablePan = false;  // Disables accidental panning off-screen
    controls.autoRotate = true;  // Continuously rotates 360 degrees
    controls.autoRotateSpeed = 0.8; // Smooth, steady rotation showing all 4 sides

    // On mobile, lock touch rotation so the user's natural finger swipes scroll the webpage without being blocked
    if (isMobile) {
      controls.enableRotate = false;
      controls.touches = { ONE: 0 as any, TWO: 0 as any };
    }

    // Lock vertical polar angle to this upward-tilted elevation
    const fixedPolarAngle = Math.acos(2.4 / 44.56); // ~1.517 rad
    controls.minPolarAngle = fixedPolarAngle;
    controls.maxPolarAngle = fixedPolarAngle;

    // 3. Balanced Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xa0aec0, 1.25);
    scene.add(ambientLight);

    // Primary Sun Light (Directional architectural sunlight)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.3);
    sunLight.position.set(24, 40, 26);
    if (!isMobile) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
    }
    scene.add(sunLight);

    // Cool Blue Rim Backlight (Accentuates structural concrete edges with cyan highlights)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    rimLight.position.set(-26, 20, -24);
    scene.add(rimLight);

    // Soft Sky-Blue Front Fill Light
    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.1);
    fillLight.position.set(0, 14, 28);
    scene.add(fillLight);

    // 4. Ground Neon Grid & Base Platform (Matching Reference Image)
    const gridHelper = new THREE.GridHelper(44, 22, 0x00f0ff, 0x075985);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Dark sleek foundation slab
    const baseGeo = new THREE.BoxGeometry(14.8, 0.25, 14.8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x040b18,
      roughness: 0.6,
      metalness: 0.4,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.125;
    scene.add(baseMesh);

    // Radiant Electric-Cyan Neon Square Border (Solid glowing 3D bars matching reference image)
    const neonWidth = 14.8;
    const barThick = 0.16;
    const neonBarMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // Front & Back Neon Bars
    const barFBGeo = new THREE.BoxGeometry(neonWidth + 0.1, 0.12, barThick);
    const frontNeonBar = new THREE.Mesh(barFBGeo, neonBarMat);
    frontNeonBar.position.set(0, 0.04, neonWidth / 2);
    scene.add(frontNeonBar);

    const backNeonBar = new THREE.Mesh(barFBGeo, neonBarMat);
    backNeonBar.position.set(0, 0.04, -neonWidth / 2);
    scene.add(backNeonBar);

    // Left & Right Neon Bars
    const barLRGeo = new THREE.BoxGeometry(barThick, 0.12, neonWidth + 0.1);
    const leftNeonBar = new THREE.Mesh(barLRGeo, neonBarMat);
    leftNeonBar.position.set(-neonWidth / 2, 0.04, 0);
    scene.add(leftNeonBar);

    const rightNeonBar = new THREE.Mesh(barLRGeo, neonBarMat);
    rightNeonBar.position.set(neonWidth / 2, 0.04, 0);
    scene.add(rightNeonBar);

    // Floor Aura (Radiant electric cyan aura under building)
    const floorAura = new THREE.PointLight(0x00f0ff, 3.8, 16);
    floorAura.position.set(0, 0.4, 0);
    scene.add(floorAura);

    // ========================================================
    // 5. ARCHITECTURAL SKELETAL BUILDING (OPEN TRANSPARENT FRAME)
    // ========================================================
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    const FLOORS = 8;
    const FLOOR_HEIGHT = 2.15;
    const TOTAL_HEIGHT = FLOORS * FLOOR_HEIGHT;
    const BUILDING_WIDTH = 11.2;
    const BUILDING_DEPTH = 11.2;

    // Authentic Architectural Concrete Material (Clean silver-grey tone)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x8fa3b7,
      roughness: 0.48,
      metalness: 0.12,
    });

    // Dark Structural Service Core Material (Rear-positioned to keep interior 100% open)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.65,
      metalness: 0.2,
    });

    // Balcony Glass Material (Semi-transparent glowing cyan architectural safety glass)
    const glassRailingMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.12,
      roughness: 0.06,
      transmission: 0.82,
      transparent: true,
      opacity: 0.38,
      reflectivity: 0.88,
    });

    // Stainless Steel Handrails & Baluster Posts
    const metalTrimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.25,
    });

    // 5.1 Rear Structural Service Elevator Shaft (Positioned in the rear so center is 100% open for pipes)
    const coreWidth = 2.4;
    const coreDepth = 2.0;
    const coreGeo = new THREE.BoxGeometry(coreWidth, TOTAL_HEIGHT + 0.4, coreDepth);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, (TOTAL_HEIGHT + 0.4) / 2, -3.4);
    buildingGroup.add(coreMesh);

    // 5.2 Floor Slabs, Balconies & Railings for each level
    const slabThickness = 0.28;
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
        const railHeight = 0.65;
        const railY = floorY + slabThickness / 2 + railHeight / 2;
        const halfW = BUILDING_WIDTH / 2;
        const halfD = BUILDING_DEPTH / 2;

        // Front & Back Glass Panels
        const fbGlassGeo = new THREE.BoxGeometry(BUILDING_WIDTH - 0.4, railHeight, 0.04);
        const frontGlass = new THREE.Mesh(fbGlassGeo, glassRailingMat);
        frontGlass.position.set(0, railY, halfD - 0.12);
        buildingGroup.add(frontGlass);

        const backGlass = new THREE.Mesh(fbGlassGeo, glassRailingMat);
        backGlass.position.set(0, railY, -halfD + 0.12);
        buildingGroup.add(backGlass);

        // Left & Right Glass Panels
        const lrGlassGeo = new THREE.BoxGeometry(0.04, railHeight, BUILDING_DEPTH - 0.4);
        const leftGlass = new THREE.Mesh(lrGlassGeo, glassRailingMat);
        leftGlass.position.set(-halfW + 0.12, railY, 0);
        buildingGroup.add(leftGlass);

        const rightGlass = new THREE.Mesh(lrGlassGeo, glassRailingMat);
        rightGlass.position.set(halfW - 0.12, railY, 0);
        buildingGroup.add(rightGlass);

        // Steel Top Handrails
        const fbRailGeo = new THREE.BoxGeometry(BUILDING_WIDTH - 0.3, 0.05, 0.07);
        const frontRail = new THREE.Mesh(fbRailGeo, metalTrimMat);
        frontRail.position.set(0, railY + railHeight / 2, halfD - 0.12);
        buildingGroup.add(frontRail);

        const backRail = new THREE.Mesh(fbRailGeo, metalTrimMat);
        backRail.position.set(0, railY + railHeight / 2, -halfD + 0.12);
        buildingGroup.add(backRail);

        const lrRailGeo = new THREE.BoxGeometry(0.07, 0.05, BUILDING_DEPTH - 0.3);
        const leftRail = new THREE.Mesh(lrRailGeo, metalTrimMat);
        leftRail.position.set(-halfW + 0.12, railY + railHeight / 2, 0);
        buildingGroup.add(leftRail);

        const rightRail = new THREE.Mesh(lrRailGeo, metalTrimMat);
        rightRail.position.set(halfW - 0.12, railY + railHeight / 2, 0);
        buildingGroup.add(rightRail);
      }
    }

    // 5.3 Concrete Structural Columns (5x5 Perimeter Grid -> 4 equal bays per face)
    const colWidth = 0.40;
    const colDepth = 0.40;
    const colGeo = new THREE.BoxGeometry(colWidth, TOTAL_HEIGHT, colDepth);

    const colXCoords = [-5.1, -2.55, 0, 2.55, 5.1];
    const colZCoords = [-5.1, -2.55, 0, 2.55, 5.1];

    colXCoords.forEach((x, xi) => {
      colZCoords.forEach((z, zi) => {
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
    const beamHeight = 0.32;
    const beamDepth = 0.36;

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
    const plantRoomGeo = new THREE.BoxGeometry(4.8, 1.8, 4.0);
    const plantRoomMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
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
    const parapetGeo = new THREE.BoxGeometry(BUILDING_WIDTH, parapetHeight, 0.28);
    const frontParapet = new THREE.Mesh(parapetGeo, concreteMat);
    frontParapet.position.set(0, roofY + parapetHeight / 2, BUILDING_DEPTH / 2 - 0.14);
    buildingGroup.add(frontParapet);

    const backParapet = new THREE.Mesh(parapetGeo, concreteMat);
    backParapet.position.set(0, roofY + parapetHeight / 2, -BUILDING_DEPTH / 2 + 0.14);
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
      metalness: 0.6,
      roughness: 0.25,
    });
    const chillerGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.4, 18);
    [-2.8, -0.6].forEach((zPos) => {
      const chiller = new THREE.Mesh(chillerGeo, chillerMat);
      chiller.rotation.z = Math.PI / 2;
      chiller.position.set(-2.8, roofY + 0.7, zPos);
      chiller.castShadow = true;
      buildingGroup.add(chiller);

      // Chiller mounting legs
      const legGeo = new THREE.BoxGeometry(0.18, 0.35, 0.5);
      const leg1 = new THREE.Mesh(legGeo, metalTrimMat);
      leg1.position.set(-3.7, roofY + 0.18, zPos);
      buildingGroup.add(leg1);
      const leg2 = new THREE.Mesh(legGeo, metalTrimMat);
      leg2.position.set(-1.9, roofY + 0.18, zPos);
      buildingGroup.add(leg2);
    });

    // Rooftop Cooling Towers (Vertical cylinders with top fans)
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.5,
      roughness: 0.35,
    });
    const towerGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.7, 18);
    [-2.8, 2.8].forEach((xPos) => {
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(xPos, roofY + 0.85, 2.6);
      tower.castShadow = true;
      buildingGroup.add(tower);

      // Top fan cowling
      const fanGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.25, 18);
      const fanMesh = new THREE.Mesh(fanGeo, metalTrimMat);
      fanMesh.position.set(xPos, roofY + 1.82, 2.6);
      buildingGroup.add(fanMesh);
    });

    // =========================================================================
    // 6. 100% RAZOR-STRAIGHT ORTHOGONAL PIPELINES (ZERO S-CURVES / ZERO WAVINESS)
    // =========================================================================
    const mepGroup = new THREE.Group();
    scene.add(mepGroup);

    interface PulseData {
      mesh: THREE.Mesh;
      offset: number;
      speed: number;
      light?: THREE.PointLight;
    }

    interface PipelineSystem {
      curve: THREE.CurvePath<THREE.Vector3>;
      pulses: PulseData[];
    }

    const systems: PipelineSystem[] = [];

    // Factory: Creates 100% Dead-Straight Pipes with Crisp 90-Degree Elbows
    const createOrthogonalPipePath = (
      points: THREE.Vector3[],
      cornerRadius = 0.22
    ): THREE.CurvePath<THREE.Vector3> => {
      const path = new THREE.CurvePath<THREE.Vector3>();
      let currentPos = points[0];

      for (let i = 1; i < points.length - 1; i++) {
        const prev = points[i - 1];
        const corner = points[i];
        const next = points[i + 1];

        const d1 = new THREE.Vector3().subVectors(corner, prev).normalize();
        const d2 = new THREE.Vector3().subVectors(next, corner).normalize();

        const dist1 = corner.distanceTo(prev);
        const dist2 = corner.distanceTo(next);
        const r = Math.min(cornerRadius, dist1 * 0.45, dist2 * 0.45);

        const pStart = corner.clone().sub(d1.clone().multiplyScalar(r));
        const pEnd = corner.clone().add(d2.clone().multiplyScalar(r));

        if (currentPos.distanceTo(pStart) > 0.005) {
          path.add(new THREE.LineCurve3(currentPos.clone(), pStart));
        }
        path.add(new THREE.QuadraticBezierCurve3(pStart, corner.clone(), pEnd));
        currentPos = pEnd;
      }

      const last = points[points.length - 1];
      if (currentPos.distanceTo(last) > 0.005) {
        path.add(new THREE.LineCurve3(currentPos.clone(), last));
      }

      return path;
    };

    // Helper: Build Dead-Straight 3D Pipe with Sleek Glowing Electrons
    const buildPipeline = (
      points: THREE.Vector3[],
      pipeColor: number,
      glowColor: number,
      radius = 0.10, // Sleek, slim, perfectly proportioned pipe diameter
      electronCount = 14,
      speed = 0.08
    ) => {
      const path = createOrthogonalPipePath(points, 0.22);
      const pipeGeo = new THREE.TubeGeometry(path, 180, radius, 12, false);
      const pipeMat = new THREE.MeshStandardMaterial({
        color: pipeColor,
        metalness: 0.8,
        roughness: 0.2,
        emissive: pipeColor,
        emissiveIntensity: 0.4,
      });

      const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
      pipeMesh.castShadow = true;
      mepGroup.add(pipeMesh);

      // Neat Industrial Couplings along pipe corners
      const jointGeo = new THREE.TorusGeometry(radius * 1.25, radius * 0.25, 8, 14);
      const jointMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
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

      // Sleek Glowing Electron Beads (Compact light pulses gliding along straight lines)
      const pulseGeo = new THREE.SphereGeometry(radius * 1.15, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });

      const pulses: PulseData[] = [];

      for (let i = 0; i < electronCount; i++) {
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        mepGroup.add(pulse);

        // Soft Point Light on select electrons (desktop only to prevent mobile GPU thermal throttling)
        let light: THREE.PointLight | undefined;
        if (!isMobile && i % 3 === 0) {
          light = new THREE.PointLight(glowColor, 1.8, 2.6);
          mepGroup.add(light);
        }

        pulses.push({
          mesh: pulse,
          offset: i / electronCount,
          speed: speed * (0.92 + Math.random() * 0.16),
          light,
        });
      }

      systems.push({ curve: path, pulses });
    };

    // --- EXACT ORTHOGONAL DEAD-STRAIGHT PIPELINES MATCHING REFERENCE IMAGE ---

    // 1. RED FIRE PROTECTION SYSTEM (Stepped Facade Riser: Wide Left-to-Right & Right-to-Left Runs in Open Window Bays)
    buildPipeline(
      [
        new THREE.Vector3(-3.2, 0.4, 4.85),     // Ground Plant Room
        new THREE.Vector3(-1.8, 0.4, 4.85),     // 90° elbow to Front-Left Bay
        new THREE.Vector3(-1.8, 5.35, 4.85),    // UP to Mid-Story 2-3 (Open Window Zone)
        new THREE.Vector3(-4.5, 5.35, 4.85),    // WIDE HORIZONTAL RUN (Right-to-Left across 2 bays)
        new THREE.Vector3(-4.5, 9.65, 4.85),    // UP to Mid-Story 4-5 (Open Window Zone)
        new THREE.Vector3(2.2, 9.65, 4.85),     // HUGE HORIZONTAL RUN (Left-to-Right across 3 bays!)
        new THREE.Vector3(2.2, 13.95, 4.85),    // UP to Mid-Story 6-7 (Open Window Zone)
        new THREE.Vector3(-1.8, 13.95, 4.85),   // WIDE HORIZONTAL RUN (Right-to-Left across center bays)
        new THREE.Vector3(-1.8, 17.4, 4.85),    // UP to Roof Parapet
        new THREE.Vector3(-1.8, 18.2, 4.85),    // 90° over the roof parapet
        new THREE.Vector3(-1.8, 18.2, 1.2),     // Across roof
        new THREE.Vector3(0.8, 18.2, 1.2),      // Enters penthouse
      ],
      0xdc2626, // Vivid Red Pipe
      0xef4444, // Red Glow
      0.12,     // Bold 0.12 radius for unmistakable visibility
      16,
      0.08
    );

    // 2. ORANGE POWER / ELECTRICAL BUSDUCT (Stepped Riser: Wide Left-to-Right & Right-to-Left Runs in Open Window Bays)
    buildPipeline(
      [
        new THREE.Vector3(2.8, 0.4, 4.85),      // Ground Front-Right
        new THREE.Vector3(2.8, 3.2, 4.85),      // UP to Mid-Story 1-2 (Open Window Zone)
        new THREE.Vector3(4.85, 3.2, 4.85),     // Step RIGHT across Front Facade
        new THREE.Vector3(4.85, 3.2, 1.5),      // Along Right Facade
        new THREE.Vector3(4.85, 7.5, 1.5),      // UP to Mid-Story 3-4 (Open Window Zone)
        new THREE.Vector3(4.85, 7.5, -3.2),     // WIDE RUN along Right Facade (Front to Back)
        new THREE.Vector3(4.85, 11.8, -3.2),    // UP to Mid-Story 5-6 (Open Window Zone)
        new THREE.Vector3(4.85, 11.8, 4.85),    // Turn to Front Facade
        new THREE.Vector3(0.5, 11.8, 4.85),     // WIDE HORIZONTAL RUN across Front Facade (Right to Left!)
        new THREE.Vector3(0.5, 16.1, 4.85),     // UP to Mid-Story 7-8 (Open Window Zone)
        new THREE.Vector3(2.8, 16.1, 4.85),     // Step RIGHT across Front Facade
        new THREE.Vector3(2.8, 17.4, 4.85),     // UP to Roof
        new THREE.Vector3(1.2, 17.4, 1.5),      // Enters electrical control room
      ],
      0xd97706, // Amber/Gold Pipe
      0xfbbf24, // Gold Glow
      0.105,    // 0.105 radius
      16,
      0.085
    );

    // 3. GREEN BMS AUTOMATION & DRAINAGE (Stepped Network: Wide Front & Back Runs in Open Window Bays)
    buildPipeline(
      [
        new THREE.Vector3(0.5, 0.4, 4.85),      // Ground Center-Front
        new THREE.Vector3(0.5, 5.35, 4.85),     // UP to Mid-Story 2-3 (Open Window Zone)
        new THREE.Vector3(-2.5, 5.35, 4.85),    // WIDE HORIZONTAL RUN across Front Facade (Right to Left!)
        new THREE.Vector3(-2.5, 9.65, 4.85),    // UP to Mid-Story 4-5 (Open Window Zone)
        new THREE.Vector3(0.5, 9.65, 4.85),     // WIDE HORIZONTAL RUN across Front Facade (Left to Right!)
        new THREE.Vector3(0.5, 9.65, -4.85),    // Traverses depth straight to Back Facade
        new THREE.Vector3(0.5, 13.95, -4.85),   // UP along Back Facade to Mid-Story 6-7
        new THREE.Vector3(4.2, 13.95, -4.85),   // WIDE HORIZONTAL RUN across Back Facade (Left to Right!)
        new THREE.Vector3(4.2, 17.4, -4.85),    // UP to Roof BMS Sensor
      ],
      0x059669, // Emerald Pipe
      0x34d399, // Green Glow
      0.10,     // 0.10 radius
      15,
      0.075
    );

    // 4. BLUE/CYAN HVAC CHILLED WATER - 4-SIDED HORIZONTAL PERIMETER MANIFOLD (Mid-Story 1-2 Open Glass Zone)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 3.2, -4.85),   // Back-Left Outer Corner
        new THREE.Vector3(-4.85, 3.2, 4.85),    // STRAIGHT HORIZONTAL along full Left Facade
        new THREE.Vector3(4.85, 3.2, 4.85),     // WIDE HORIZONTAL along full Front Facade (Left to Right!)
        new THREE.Vector3(4.85, 3.2, -4.85),    // STRAIGHT HORIZONTAL along full Right Facade
        new THREE.Vector3(-2.2, 3.2, -4.85),    // STRAIGHT HORIZONTAL along Back Facade to Riser
        new THREE.Vector3(-2.2, 17.5, -4.85),   // STRAIGHT VERTICAL RISER to Roof Chillers
        new THREE.Vector3(-2.8, 17.8, -1.0),    // Directly enters rooftop chiller
      ],
      0x0284c7, // Sky Blue Pipe
      0x38bdf8, // Cyan Glow
      0.11,     // 0.11 radius
      18,
      0.07
    );

    // 5. BLUE/CYAN HVAC CHILLED WATER - SECONDARY PERIMETER RING (Mid-Story 5-6 Open Glass Zone)
    buildPipeline(
      [
        new THREE.Vector3(4.85, 11.8, 4.85),    // Front-Right Corner
        new THREE.Vector3(-4.85, 11.8, 4.85),   // WIDE HORIZONTAL across Front Facade (Right to Left!)
        new THREE.Vector3(-4.85, 11.8, -4.85),  // STRAIGHT across Left Facade
        new THREE.Vector3(4.85, 11.8, -4.85),   // STRAIGHT across Back Facade
        new THREE.Vector3(4.85, 11.8, 4.85),    // STRAIGHT across Right Facade (Full 360° ring)
      ],
      0x0ea5e9, // Bright Sky Blue
      0x7dd3fc,
      0.095,
      16,
      0.07
    );

    // 6. RED SECONDARY FIRE STANDPIPE (Stepped Left Facade: Wide Runs in Open Glass Zones)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 0.4, -2.5),    // Ground Left Facade
        new THREE.Vector3(-4.85, 5.35, -2.5),   // UP to Mid-Story 2-3
        new THREE.Vector3(-4.85, 5.35, 2.5),    // WIDE HORIZONTAL along Left Facade (Back to Front)
        new THREE.Vector3(-4.85, 11.8, 2.5),    // UP to Mid-Story 5-6
        new THREE.Vector3(-4.85, 11.8, -2.5),   // WIDE HORIZONTAL along Left Facade (Front to Back)
        new THREE.Vector3(-4.85, 17.2, -2.5),   // UP to Floor 8
        new THREE.Vector3(-3.2, 17.2, -2.5),    // Enters floor distribution
      ],
      0xdc2626, // Vivid Red Pipe
      0xef4444, // Red Glow
      0.10,
      15,
      0.08
    );

    // 7. ORANGE SECONDARY SUBSTATION FEEDER (Stepped Runs across Back & Right Facades in Open Window Bays)
    buildPipeline(
      [
        new THREE.Vector3(1.6, 0.4, -4.85),     // Ground Back Substation
        new THREE.Vector3(1.6, 5.35, -4.85),    // UP to Mid-Story 2-3 (Open Window Zone)
        new THREE.Vector3(4.85, 5.35, -4.85),   // WIDE RUN across Back Facade (Left to Right!)
        new THREE.Vector3(4.85, 5.35, -1.5),    // Along Right Facade
        new THREE.Vector3(4.85, 11.8, -1.5),    // UP to Mid-Story 5-6 (Open Window Zone)
        new THREE.Vector3(4.85, 11.8, -4.85),   // Along Right Facade corner
        new THREE.Vector3(1.6, 11.8, -4.85),    // WIDE RUN across Back Facade (Right to Left!)
        new THREE.Vector3(1.6, 17.2, -4.85),    // UP to Floor 8
      ],
      0xd97706, // Amber/Gold Pipe
      0xfbbf24, // Gold Glow
      0.095,
      14,
      0.08
    );

    // 8. BLUE/CYAN CHILLED WATER RETURN HEADER (Mid-Story 3-4 Full Front Facade Run)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 7.5, -2.5),    // Left Facade
        new THREE.Vector3(-4.85, 7.5, 4.85),    // Outer Front-Left Corner
        new THREE.Vector3(4.2, 7.5, 4.85),      // FULL HORIZONTAL RUN across entire Front Facade (Left to Right!)
        new THREE.Vector3(4.2, 7.5, 1.5),       // 90° into Right Facade
      ],
      0x0284c7, // Sky Blue Pipe
      0x38bdf8, // Cyan Glow
      0.11,     // 0.11 radius
      16,
      0.075
    );

    // 9. GREEN BMS & DRAINAGE UTILITY STACK (Stepped Left & Front Facades in Open Window Bays)
    buildPipeline(
      [
        new THREE.Vector3(-3.2, 0.4, 4.85),     // Ground Left-Front
        new THREE.Vector3(-3.2, 3.2, 4.85),     // UP to Mid-Story 1-2 (Open Window Zone)
        new THREE.Vector3(-4.85, 3.2, 4.85),    // Step LEFT across Front Facade
        new THREE.Vector3(-4.85, 3.2, 0.5),     // Along Left Facade
        new THREE.Vector3(-4.85, 7.5, 0.5),     // UP to Mid-Story 3-4 (Open Window Zone)
        new THREE.Vector3(-4.85, 7.5, -3.2),    // WIDE RUN along Left Facade (Front to Back!)
        new THREE.Vector3(-4.85, 11.8, -3.2),   // UP to Mid-Story 5-6 (Open Window Zone)
        new THREE.Vector3(-4.85, 11.8, 1.8),    // WIDE RUN along Left Facade (Back to Front!)
        new THREE.Vector3(-2.5, 11.8, 4.85),    // Step across Front Facade
        new THREE.Vector3(-2.5, 15.05, 4.85),   // UP to Floor 7
      ],
      0x059669, // Emerald Pipe
      0x34d399, // Green Glow
      0.09,
      13,
      0.075
    );

    // 7. Animation Loop (with Viewport-Aware Auto-Pausing & Mobile FPS Throttling)
    const clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;
    let lastRenderTime = 0;
    const targetFps = isMobile ? 35 : 60;
    const frameInterval = 1000 / targetFps;

    // Pause WebGL rendering loop when user scrolls away from hero banner
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);

      // Save GPU/CPU & battery when scrolled off-screen
      if (!isVisible) return;

      // Throttle framerate on mobile to keep device cool and prevent 100% CPU lock
      if (timestamp - lastRenderTime < frameInterval) {
        return;
      }
      lastRenderTime = timestamp;

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

    animId = requestAnimationFrame(animate);

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
      observer.disconnect();
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
      style={{ touchAction: "pan-y" }}
      className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto cursor-grab active:cursor-grabbing z-0"
    />
  );
}

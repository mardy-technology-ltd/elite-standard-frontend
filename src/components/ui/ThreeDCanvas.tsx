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
    // Lowered perspective gazing upwards towards the towering building
    camera.position.set(11.5, 12.5, 44.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18; // Balanced natural brightness
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Interactive Controls (Continuous Horizontal 360° Turntable, Vertical Tilt Locked)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 10.0, 0); // Focuses higher up to tilt the view upwards
    controls.enableZoom = false; // Zooming is completely disabled
    controls.enablePan = false;  // Disables accidental panning off-screen
    controls.autoRotate = true;  // Continuously rotates 360 degrees
    controls.autoRotateSpeed = 0.8; // Smooth, steady rotation showing all 4 sides

    // Lock vertical polar angle to this upward-tilted elevation
    const fixedPolarAngle = Math.acos(2.5 / 45.55); // ~1.516 rad
    controls.minPolarAngle = fixedPolarAngle;
    controls.maxPolarAngle = fixedPolarAngle;

    // 3. Balanced Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xa0aec0, 1.25);
    scene.add(ambientLight);

    // Primary Sun Light (Directional architectural sunlight)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.3);
    sunLight.position.set(24, 40, 26);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Cool Blue Rim Backlight (Accentuates structural concrete edges with cyan highlights)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    rimLight.position.set(-26, 20, -24);
    scene.add(rimLight);

    // Soft Sky-Blue Front Fill Light
    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.1);
    fillLight.position.set(0, 14, 28);
    scene.add(fillLight);

    // 4. Ground Neon Grid & Base Platform
    const gridHelper = new THREE.GridHelper(36, 18, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Dark sleek foundation slab
    const baseGeo = new THREE.BoxGeometry(15, 0.25, 15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x070d1a,
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
      new THREE.LineBasicMaterial({ color: 0x0284c7, linewidth: 2 })
    );
    baseLine.position.y = -0.125;
    scene.add(baseLine);

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

        // Soft Point Light on select electrons for subtle ambient glow
        let light: THREE.PointLight | undefined;
        if (i % 3 === 0) {
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

    // 1. RED FIRE PROTECTION SYSTEM (Front-Left Perimeter Riser + 90° Branches)
    buildPipeline(
      [
        new THREE.Vector3(-3.2, 0.4, 4.85),     // Ground Plant Room
        new THREE.Vector3(-1.6, 0.4, 4.85),     // 90° elbow to Front-Left Bay
        new THREE.Vector3(-1.6, 6.45, 4.85),    // STRAIGHT VERTICAL RISER Floor 1-3
        new THREE.Vector3(-4.85, 6.45, 4.85),   // 90° horizontal branch to Left Corner
        new THREE.Vector3(-4.85, 6.45, 1.5),    // 90° depth turn along Left Facade
        new THREE.Vector3(-1.6, 6.45, 4.85),    // Main riser intersection
        new THREE.Vector3(-1.6, 17.4, 4.85),    // STRAIGHT VERTICAL RISER up to Roof
        new THREE.Vector3(-1.6, 18.2, 4.85),    // 90° over the roof parapet
        new THREE.Vector3(-1.6, 18.2, 1.2),     // Straight across roof
        new THREE.Vector3(0.8, 18.2, 1.2),      // Enters penthouse
      ],
      0xdc2626, // Vivid Red Pipe
      0xef4444, // Red Glow
      0.10,     // Slim 0.10 radius
      16,
      0.08
    );

    // 2. ORANGE POWER / ELECTRICAL BUSDUCT (Front-Right & Right Facade Riser)
    buildPipeline(
      [
        new THREE.Vector3(2.8, 0.4, 4.85),      // Ground Front-Right
        new THREE.Vector3(2.8, 6.45, 4.85),     // STRAIGHT VERTICAL RISER Floor 1-3
        new THREE.Vector3(4.85, 6.45, 4.85),    // 90° horizontal branch to Right Corner
        new THREE.Vector3(4.85, 6.45, 1.5),     // 90° turn along Right Facade
        new THREE.Vector3(4.85, 12.9, 1.5),     // STRAIGHT VERTICAL RISER Floor 4-6 on Right Facade
        new THREE.Vector3(4.85, 12.9, 4.85),    // 90° horizontal branch forward to Front Facade
        new THREE.Vector3(2.0, 12.9, 4.85),     // Straight cross-feed across Floor 6 Front
        new THREE.Vector3(4.85, 12.9, 1.5),     // Riser junction
        new THREE.Vector3(4.85, 17.2, 1.5),     // STRAIGHT VERTICAL to Floor 8
        new THREE.Vector3(1.2, 17.2, 1.5),      // Enters electrical control room
      ],
      0xd97706, // Amber/Gold Pipe
      0xfbbf24, // Gold Glow
      0.10,     // Slim 0.10 radius
      16,
      0.085
    );

    // 3. GREEN BMS AUTOMATION & DRAINAGE (Front Center-Bottom & Top Right Ceiling)
    buildPipeline(
      [
        new THREE.Vector3(0.5, 0.4, 4.85),      // Ground Center-Front
        new THREE.Vector3(0.5, 8.6, 4.85),      // STRAIGHT VERTICAL through Floor 1-4
        new THREE.Vector3(-1.6, 8.6, 4.85),     // 90° horizontal tie to Floor 4
        new THREE.Vector3(-1.6, 8.6, -4.85),    // 90° depth run to Back Facade
        new THREE.Vector3(2.55, 8.6, -4.85),    // Straight horizontal across Back Facade
        new THREE.Vector3(2.55, 15.05, -4.85),  // Vertical Riser along Back Facade to Floor 7
        new THREE.Vector3(4.85, 15.05, -4.85),  // 90° corner to Right Facade ceiling
        new THREE.Vector3(4.85, 15.05, 1.5),    // Straight along Right ceiling
        new THREE.Vector3(2.55, 17.4, -4.85),   // Roof BMS sensor
      ],
      0x059669, // Emerald Pipe
      0x34d399, // Green Glow
      0.095,    // Slim 0.095 radius
      15,
      0.075
    );

    // 4. BLUE/CYAN HVAC CHILLED WATER - RAZOR-STRAIGHT 4-SIDED HORIZONTAL PERIMETER MANIFOLD (Floor 2)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 4.3, -4.85),   // Back-Left Outer Corner
        new THREE.Vector3(-4.85, 4.3, 4.85),    // STRAIGHT HORIZONTAL along full Left Facade
        new THREE.Vector3(4.85, 4.3, 4.85),     // STRAIGHT HORIZONTAL along full Front Facade
        new THREE.Vector3(4.85, 4.3, -4.85),    // STRAIGHT HORIZONTAL along full Right Facade
        new THREE.Vector3(-2.2, 4.3, -4.85),    // STRAIGHT HORIZONTAL along Back Facade to Riser
        new THREE.Vector3(-2.2, 17.5, -4.85),   // STRAIGHT VERTICAL RISER to Roof Chillers
        new THREE.Vector3(-2.8, 17.8, -1.0),    // Directly enters rooftop chiller
      ],
      0x0284c7, // Sky Blue Pipe
      0x38bdf8, // Cyan Glow
      0.105,    // Slim 0.105 radius
      18,
      0.07
    );

    // 5. BLUE/CYAN HVAC CHILLED WATER - SECONDARY RAZOR-STRAIGHT PERIMETER RING (Floor 5)
    buildPipeline(
      [
        new THREE.Vector3(4.85, 10.75, 4.85),   // Front-Right Corner
        new THREE.Vector3(-4.85, 10.75, 4.85),  // STRAIGHT across Front Facade
        new THREE.Vector3(-4.85, 10.75, -4.85), // STRAIGHT across Left Facade
        new THREE.Vector3(4.85, 10.75, -4.85),  // STRAIGHT across Back Facade
        new THREE.Vector3(4.85, 10.75, 4.85),   // STRAIGHT across Right Facade (Full 360° ring)
      ],
      0x0ea5e9, // Bright Sky Blue
      0x7dd3fc,
      0.09,     // Slim 0.09 radius
      16,
      0.07
    );

    // 6. RED SECONDARY FIRE STANDPIPE (Left & Back Facade Loops)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 0.4, -1.8),    // Ground Left Facade
        new THREE.Vector3(-4.85, 8.6, -1.8),    // STRAIGHT VERTICAL along Left Facade to Floor 4
        new THREE.Vector3(-4.85, 8.6, -4.85),   // 90° Corner to Back Facade
        new THREE.Vector3(0.0, 8.6, -4.85),     // Straight across Back Facade
        new THREE.Vector3(-4.85, 8.6, -1.8),    // Loop junction
        new THREE.Vector3(-4.85, 15.05, -1.8),  // STRAIGHT VERTICAL to Floor 7
        new THREE.Vector3(-4.85, 15.05, 3.2),   // Straight forward along Left Facade
      ],
      0xdc2626, // Vivid Red Pipe
      0xef4444, // Red Glow
      0.095,
      15,
      0.08
    );

    // 7. ORANGE SECONDARY SUBSTATION FEEDER (Back & Right Facade Distribution)
    buildPipeline(
      [
        new THREE.Vector3(1.6, 0.4, -4.85),     // Ground Back Substation
        new THREE.Vector3(1.6, 6.45, -4.85),    // STRAIGHT VERTICAL up Back Facade to Floor 3
        new THREE.Vector3(4.85, 6.45, -4.85),   // 90° to Back-Right Corner
        new THREE.Vector3(4.85, 6.45, -1.8),    // Along Right Facade
        new THREE.Vector3(4.85, 15.05, -4.85),  // Straight UP Right-Back Corner to Floor 7
        new THREE.Vector3(2.2, 15.05, -4.85),   // Straight across Back ceiling
      ],
      0xd97706, // Amber/Gold Pipe
      0xfbbf24, // Gold Glow
      0.095,
      14,
      0.08
    );

    // 8. BLUE/CYAN CHILLED WATER RETURN HEADER (Floor 3 Front & Left Facades)
    buildPipeline(
      [
        new THREE.Vector3(-4.85, 6.45, -2.5),   // Left Facade
        new THREE.Vector3(-4.85, 6.45, 4.85),   // Outer Front-Left Corner
        new THREE.Vector3(3.5, 6.45, 4.85),     // STRAIGHT across FRONT FACADE (Floor 3)
        new THREE.Vector3(3.5, 6.45, 2.0),      // 90° into Right Facade
      ],
      0x0284c7, // Sky Blue Pipe
      0x38bdf8, // Cyan Glow
      0.10,
      15,
      0.075
    );

    // 9. GREEN BMS & DRAINAGE UTILITY STACK (Left-Front Facade Floors 1-5)
    buildPipeline(
      [
        new THREE.Vector3(-3.2, 0.4, 4.85),     // Ground Left-Front
        new THREE.Vector3(-3.2, 10.75, 4.85),   // STRAIGHT VERTICAL up to Floor 5
        new THREE.Vector3(-4.85, 10.75, 4.85),  // 90° to Outer Left-Front Corner
        new THREE.Vector3(-4.85, 10.75, 1.8),   // Along Left Facade
      ],
      0x059669, // Emerald Pipe
      0x34d399, // Green Glow
      0.09,
      13,
      0.075
    );

    // 7. Animation Loop (Smooth Gentle Electron Movement along Straight Pipes)
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

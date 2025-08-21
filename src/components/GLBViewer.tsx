"use client";

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, PresentationControls } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Leaf, Hand, Zap, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from 'three';

interface Attachment {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  visible: boolean;
  meshName?: string; // Name of the mesh in the GLB file
}

const ATTACHMENTS: Attachment[] = [
  {
    id: "cutter",
    name: "Aquatic Cutter",
    icon: <Wrench className="h-4 w-4" />,
    description: "Rotary cutter for dense reeds and cattails",
    visible: true,
    meshName: "cutter_mesh"
  },
  {
    id: "dredge",
    name: "Dredge Pump",
    icon: <Zap className="h-4 w-4" />,
    description: "Sediment removal up to 80 m³/h",
    visible: true,
    meshName: "dredge_mesh"
  },
  {
    id: "rake",
    name: "Rake & Grab",
    icon: <Hand className="h-4 w-4" />,
    description: "Precision debris recovery and shoreline cleanup",
    visible: true,
    meshName: "rake_mesh"
  },
  {
    id: "harvester",
    name: "Weed Harvester",
    icon: <Leaf className="h-4 w-4" />,
    description: "High-throughput aquatic vegetation collection",
    visible: true,
    meshName: "harvester_mesh"
  }
];

function Model({ glbPath, attachments, isExploded }: { 
  glbPath: string; 
  attachments: Attachment[];
  isExploded: boolean;
}) {
  const { scene } = useGLTF(glbPath);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle rotation animation
      modelRef.current.rotation.y += 0.005;
    }
  });

  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();

  // Apply explosion effect if enabled
  if (isExploded && modelRef.current) {
    clonedScene.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        const direction = new THREE.Vector3(
          Math.sin(index * 0.5) * 2,
          Math.cos(index * 0.5) * 1,
          Math.sin(index * 0.3) * 2
        );
        child.position.add(direction);
      }
    });
  }

  return (
    <group ref={modelRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function GLBViewer() {
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [glbPath, setGlbPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setGlbPath(url);
    }
  };

  const resetView = () => {
    // This would reset the camera position in a real implementation
    console.log('Reset view');
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload GLB/GLTF Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.gltf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              Choose GLB/GLTF File
            </Button>
            <p className="text-sm text-muted-foreground">
              Upload your 3D model file (.glb or .gltf format)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewer */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>3D Equipment Viewer</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset View
              </Button>
              <Button
                variant={isExploded ? "default" : "outline"}
                size="sm"
                onClick={() => setIsExploded(!isExploded)}
              >
                {isExploded ? "Assembled" : "Exploded"} View
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
            {glbPath ? (
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Environment preset="city" />
                  
                  <PresentationControls
                    global
                    rotation={[0, -Math.PI / 4, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <Model 
                      glbPath={glbPath} 
                      attachments={ATTACHMENTS}
                      isExploded={isExploded}
                    />
                  </PresentationControls>
                  
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={10}
                  />
                </Suspense>
              </Canvas>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚤</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    Upload a GLB/GLTF file to view your 3D model
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {selectedAttachment 
                      ? `Selected: ${ATTACHMENTS.find(a => a.id === selectedAttachment)?.name}`
                      : "Select an attachment below to configure visibility"
                    }
                  </div>
                  <Badge variant="secondary">
                    Supports .glb and .gltf formats
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attachment Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Attachments & Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {ATTACHMENTS.map((attachment) => (
              <div
                key={attachment.id}
                className={`relative rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedAttachment === attachment.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedAttachment(
                  selectedAttachment === attachment.id ? null : attachment.id
                )}
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {attachment.icon}
                      <span className="font-medium">{attachment.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {attachment.description}
                    </div>
                  </div>
                </div>
                {selectedAttachment === attachment.id && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="text-xs">
                      Selected
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controls Info */}
      <Card>
        <CardHeader>
          <CardTitle>Viewer Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Mouse: Rotate view</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Scroll: Zoom in/out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Right-click: Pan view</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

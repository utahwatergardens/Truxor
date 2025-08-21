
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Leaf, Hand, Zap, RotateCcw, Upload, Download, Eye, EyeOff, Scissors, Grip, Droplets, Shield, Settings, Truck, Anchor } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const ATTACHMENTS: Attachment[] = [
  // Cutting Tools
  {
    id: "dorocutter-d",
    name: "Dorocutter D-Series",
    icon: <Scissors className="h-4 w-4" />,
    description: "D20/D30/D40 hydraulic cutting knives for reed with telescopic options",
    image: "/images/New Images/Truxor_Cutting-Collecting_3_web.jpg"
  },
  {
    id: "doro-esm",
    name: "Doro Cutter ESM-Series",
    icon: <Scissors className="h-4 w-4" />,
    description: "ESM20-60 precision cutting with double-acting Busati blades, depth 50-80cm",
    image: "/images/New Images/Truxor_Cutting-Collecting_4_web.jpg"
  },
  
  // Collecting & Raking Tools
  {
    id: "reed-rake",
    name: "Reed Rake & High-Tip Rake",
    icon: <Hand className="h-4 w-4" />,
    description: "Retractable side sections for loading and debris collection with perforated versions",
    image: "/images/New Images/Truxor_Cutting-Collecting_11_web.jpg"
  },
  {
    id: "dorogrip",
    name: "DoroGrip (Grip Drive Unit)",
    icon: <Grip className="h-4 w-4" />,
    description: "Versatile grab tool for vegetation, debris, roots, plastics - mountable via excavator arm",
    image: "/images/New Images/Truxor_Cutting-Collecting_12_web.jpg"
  },
  
  // Digging & Excavation Tools
  {
    id: "doro-digger",
    name: "Doro Digger (T-Series)",
    icon: <Wrench className="h-4 w-4" />,
    description: "Heavy-duty steel arm for sediment work, trenching, rotating tool mounting",
    image: "/images/New Images/Truxor_Cutting-Collecting_7_web.jpg"
  },
  {
    id: "outrigger",
    name: "Outrigger (Front T-Series)",
    icon: <Anchor className="h-4 w-4" />,
    description: "Stabilization support often used with digging operations",
    image: "/images/New Images/Truxor_Cutting-Collecting_8_web.jpg"
  },
  
  // Dredging & Pumping Tools
  {
    id: "doro-pump-v3",
    name: "Doro Pump V3",
    icon: <Droplets className="h-4 w-4" />,
    description: "Hydraulic dredge pump with screw feeding for efficient sediment removal",
    image: "/images/New Images/Truxor_Cutting-Collecting_9_web.jpg"
  },
  {
    id: "doro-pump-screw",
    name: "Doro Pump w/ Screw Feeder",
    icon: <Droplets className="h-4 w-4" />,
    description: "Enhanced pump with screw feeding designed to minimize clogging",
    image: "/images/New Images/Truxor_Cutting-Collecting_10_web.jpg"
  },
  
  // Cleaning & Environmental Tools
  {
    id: "doroskimmer",
    name: "Doroskimmer 800",
    icon: <Shield className="h-4 w-4" />,
    description: "Specialized skimming tool for oil spill recovery and environmental cleanup",
    image: "/images/New Images/Truxor_Cutting-Collecting_13_web.jpg"
  },
  {
    id: "sala-rollpump",
    name: "Sala Rollpump",
    icon: <Droplets className="h-4 w-4" />,
    description: "Advanced pumping system for targeted environmental spreading tasks",
    image: "/images/New Images/Truxor_Cutting-Collecting_14_web.jpg"
  },
  
  // Add-Ons & Specialty Accessories
  {
    id: "hydraulic-propeller",
    name: "Hydraulic Propeller",
    icon: <Settings className="h-4 w-4" />,
    description: "Boosts on-water speed and maneuverability for transport jobs",
    image: "/images/New Images/Truxor_Cutting-Collecting_15_web.jpg"
  },
  {
    id: "flail-mulcher",
    name: "Flail Mulcher (Orsi)",
    icon: <Leaf className="h-4 w-4" />,
    description: "High-performance mulching attachment for vegetation management",
    image: "/images/New Images/Truxor_Cutting-Collecting_16_web.jpg"
  },
  {
    id: "wood-chipper",
    name: "Wood Chipper",
    icon: <Scissors className="h-4 w-4" />,
    description: "Heavy-duty wood processing attachment for debris management",
    image: "/images/New Images/Truxor_Cutting-Collecting_17_web.jpg"
  },
  {
    id: "doromiller",
    name: "Doromiller",
    icon: <Wrench className="h-4 w-4" />,
    description: "Operating Unit DoroDigg rotor for marshland milling with interchangeable cutting mechanisms",
    image: "/images/New Images/Truxor_Cutting-Collecting_18_web.jpg"
  },
  {
    id: "trailer",
    name: "Trailer Variant 2700U5",
    icon: <Truck className="h-4 w-4" />,
    description: "Transport adaptor for easy equipment mobility",
    image: "/images/New Images/Truxor_Cutting-Collecting_19_web.jpg"
  }
];

export default function Simple3DViewer() {
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [glbPath, setGlbPath] = useState<string | null>("/8_20_2025.glb");
  const [show3DViewer, setShow3DViewer] = useState(true);
  const resetView = () => {
    console.log('Reset view');
  };

  return (
    <div className="space-y-6">

      {/* 3D Viewer */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>3D Equipment Viewer</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShow3DViewer(!show3DViewer)}
              >
                {show3DViewer ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {show3DViewer ? "Hide" : "Show"} 3D
              </Button>
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
          {show3DViewer ? (
            <div className="relative h-96 w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <model-viewer
                  src="/8_20_2025.glb"
                  alt="Professional Equipment 3D Model"
                  auto-rotate
                  camera-controls
                  style={{width: '100%', height: '100%'}}
                />
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="gradient-bg text-white">
                  ✅ 3D Model
                </Badge>
              </div>
            </div>
          ) : (
            <div className="relative h-96 w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚤</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {isExploded ? "Exploded View" : "Our Professional Equipment"}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {selectedAttachment 
                    ? `Showing: ${ATTACHMENTS.find(a => a.id === selectedAttachment)?.name}`
                    : "Select an attachment below to view"
                  }
                </div>
                <Badge variant="secondary" className="gradient-bg text-white">
                  3D Model Hidden
                </Badge>
              </div>
            </div>
          )}
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

      {/* Attachment Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Official Attachments & Tools</CardTitle>
          <p className="text-sm text-muted-foreground">
            Our machine is compatible with the full suite of original tools, thanks to its powerful hydraulic outputs and quick-change bracket (X4) system.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ATTACHMENTS.map((attachment) => (
              <div
                key={attachment.id}
                className={`relative rounded-lg border p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedAttachment === attachment.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedAttachment(
                  selectedAttachment === attachment.id ? null : attachment.id
                )}
              >
                <div className="flex gap-2">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={attachment.image} 
                      alt={attachment.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      {attachment.icon}
                      <span className="font-medium text-sm truncate">{attachment.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {attachment.description}
                    </div>
                  </div>
                </div>
                {selectedAttachment === attachment.id && (
                  <div className="absolute top-1 right-1">
                    <Badge variant="default" className="text-xs px-1.5 py-0.5">
                      Selected
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

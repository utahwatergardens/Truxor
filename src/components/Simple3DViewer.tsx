
"use client";

/// <reference path="../types/model-viewer.d.ts" />

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
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Define attachment categories
  const attachmentCategories = {
    all: "All Tools",
    cutting: "Cutting",
    collection: "Collection", 
    dredging: "Dredging",
    specialty: "Specialty"
  };

  // Filter attachments based on active category
  const filteredAttachments = ATTACHMENTS.filter(attachment => {
    if (activeCategory === "all") return true;
    
    // Define which attachments belong to which categories
    const categoryMap: { [key: string]: string[] } = {
      cutting: ["dorocutter-d", "doro-esm", "flail-mulcher", "wood-chipper"],
      collection: ["reed-rake", "dorogrip"],
      dredging: ["doro-pump-v3", "doro-pump-screw", "sala-rollpump"],
      specialty: ["doro-digger", "outrigger", "doroskimmer", "hydraulic-propeller", "doromiller", "trailer"]
    };
    
    return categoryMap[activeCategory]?.includes(attachment.id) || false;
  });
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
          <CardTitle className="text-2xl font-bold">Official Attachments & Tools</CardTitle>
          <p className="text-base text-muted-foreground max-w-4xl">
            Our machine is compatible with the full suite of original tools, thanks to its powerful hydraulic outputs and quick-change bracket (X4) system. 
            Each attachment is designed for specific applications and can be easily swapped for maximum versatility.
          </p>
        </CardHeader>
        <CardContent>
          {/* Category Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(attachmentCategories).map(([key, label]) => (
                <Badge
                  key={key}
                  variant={activeCategory === key ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    activeCategory === key 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => setActiveCategory(key)}
                >
                  {label}
                </Badge>
              ))}
            </div>
            {activeCategory !== "all" && (
              <div className="mt-3 text-sm text-gray-600">
                Showing {filteredAttachments.length} of {ATTACHMENTS.length} attachments
              </div>
            )}
          </div>

          {/* Enhanced Grid Layout - Expanded Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAttachments.map((attachment) => (
              <div
                key={attachment.id}
                className={`group relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  selectedAttachment === attachment.id 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl' 
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
                onClick={() => setSelectedAttachment(
                  selectedAttachment === attachment.id ? null : attachment.id
                )}
              >
                {/* Image Section - Larger */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={attachment.image} 
                    alt={attachment.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm">
                    {attachment.icon}
                  </div>
                </div>

                {/* Content Section - Enhanced */}
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                    {attachment.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {attachment.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {selectedAttachment === attachment.id && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="default" className="text-sm px-3 py-1 bg-blue-600 shadow-lg">
                      Selected
                    </Badge>
                  </div>
                )}

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">{filteredAttachments.length}</div>
                <div className="text-sm text-blue-700">
                  {activeCategory === "all" ? "Total Attachments" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tools`}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-50">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-green-700">Categories</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50">
                <div className="text-2xl font-bold text-purple-600">X4</div>
                <div className="text-sm text-purple-700">Quick-Change System</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-50">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-orange-700">Compatible</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

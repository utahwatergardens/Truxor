"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Leaf, Hand, Zap } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const ATTACHMENTS: Attachment[] = [
  {
    id: "cutter",
    name: "Aquatic Cutter",
    icon: <Wrench className="h-4 w-4" />,
    description: "Rotary cutter for dense reeds and cattails",
    image: "/images/New Images/Truxor_Cutting-Collecting_3_web.jpg"
  },
  {
    id: "dredge",
    name: "Dredge Pump",
    icon: <Zap className="h-4 w-4" />,
    description: "Sediment removal up to 80 m³/h",
    image: "/images/New Images/Truxor_Cutting-Collecting_7_web.jpg"
  },
  {
    id: "rake",
    name: "Rake & Grab",
    icon: <Hand className="h-4 w-4" />,
    description: "Precision debris recovery and shoreline cleanup",
    image: "/images/New Images/Truxor_Cutting-Collecting_11_web.jpg"
  },
  {
    id: "harvester",
    name: "Weed Harvester",
    icon: <Leaf className="h-4 w-4" />,
    description: "High-throughput aquatic vegetation collection",
    image: "/images/New Images/Truxor_Cutting-Collecting_16_web.jpg"
  }
];

export default function ModelViewer() {
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);

  return (
    <div className="space-y-6">
      {/* 3D Viewer Placeholder */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>3D Equipment Viewer</span>
            <div className="flex gap-2">
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
              <Badge variant="secondary">
                GLB Model Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attachment Selector */}
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
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={attachment.image} 
                      alt={attachment.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
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

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourcesSection() {
  const [showDiagramsModal, setShowDiagramsModal] = useState(false);

  function ResourceItem({ title, href, onClick }: { title: string; href?: string; onClick?: () => void }) {
    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (href) {
        window.open(href, '_blank');
      }
    };

    return (
      <div className="flex items-center justify-between rounded-xl border p-4 hover-lift glass-effect cursor-pointer" onClick={handleClick}>
        <span>{title}</span>
        <Button variant="secondary" size="sm" className="gradient-bg hover-lift">Open</Button>
      </div>
    );
  }

  return (
    <>
      <Card className="hover-lift shadow-glow">
        <CardHeader>
          <CardTitle className="gradient-text">Resources</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResourceItem title="Operator handbook" href="#" />
          <ResourceItem title="Hydraulic schematics" href="#" />
          <ResourceItem title="Attachment compatibility chart" href="#" />
          <ResourceItem title="Environmental compliance guide" href="#" />
          <ResourceItem title="Equipment specifications" onClick={() => setShowDiagramsModal(true)} />
          <ResourceItem title="Maintenance procedures" href="#" />
        </CardContent>
      </Card>

      {/* Equipment Diagrams Modal */}
      {showDiagramsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">Equipment Technical Diagrams</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDiagramsModal(false)}
                  className="hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                
                {/* System Overview Diagram */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">System Overview</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">[ Operator Cab ]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">[ Hydraulic Power Unit ]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌───────────────┬───────────────┐</div>
                    <div className="text-center mb-2">│ │</div>
                    <div className="text-center mb-2">[ Cutting Tools ][ Dredge Pump ]</div>
                    <div className="text-center mb-2">[ Excavator Arm ]</div>
                    <div className="text-center mb-2">│ │</div>
                    <div className="text-center mb-2">(Reeds, weeds) (Sludge) (Digging, pulling)</div>
                  </div>
                </div>

                {/* Control System Diagram */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Control System</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">[Operator Joystick]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">[Hydraulic Lines]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌─────────┴──────────┐</div>
                    <div className="text-center mb-2">│ │</div>
                    <div className="text-center mb-2">[Quick-Change X4] (350–400 kg lift cap)</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌─────┼─────────────────────────┬──────┐</div>
                    <div className="text-center mb-2">│ │ │ │</div>
                    <div className="text-center mb-2">[Doro Cutter] [Doro Pump] [Doro Digger]</div>
                  </div>
                </div>

                {/* Cutting System Specifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Cutting System</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">┌──────────────────────────┐</div>
                    <div className="text-center mb-2">│ Busati Double Knife │</div>
                    <div className="text-center mb-2">└──────────────────────────┘</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">Cutting depth: 0.5–2.1 m</div>
                    <div className="text-center mb-2">Width: 2–4 m (depending on model)</div>
                    <div className="text-center mb-2">Attachments:</div>
                    <div className="text-center mb-2">- D20/D30/D40 = aquatic vegetation</div>
                    <div className="text-center mb-2">- ESM20–60 = wetlands, coarse plants</div>
                  </div>
                </div>

                {/* Hydraulic Arm & Tools */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Hydraulic Arm & Tools</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">[Hydraulic Arm]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌───────┼────────┐</div>
                    <div className="text-center mb-2">│ │</div>
                    <div className="text-center mb-2">[Bucket / Shovel] [Grip Tool]</div>
                    <div className="text-center mb-2">(Digging 3m deep) (Pulling roots, debris)</div>
                    <div className="text-center mb-2">Specs:</div>
                    <div className="text-center mb-2">- Max depth: 3 m</div>
                    <div className="text-center mb-2">- Max lift: ~400 kg</div>
                    <div className="text-center mb-2">- Max radius: 4 m</div>
                  </div>
                </div>

                {/* Environmental Tools */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Environmental Tools</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">[Truxor T50]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">[Hydraulic PTO]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌──────┼───────────┬────────────┐</div>
                    <div className="text-center mb-2">│ │ │ │</div>
                    <div className="text-center mb-2">[Skimmer] [Roll Pump] [Doro Tank] [Spreader]</div>
                    <div className="text-center mb-2">(Oil) (Sludge) (Waste) (Granules)</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setShowDiagramsModal(false)}
                  className="gradient-bg hover-lift shadow-glow"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

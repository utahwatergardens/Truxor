"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Upload, Cpu, Download } from "lucide-react";

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
  estimatedTime: number; // in minutes
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: 'upload',
    name: 'Upload Complete',
    description: '20 frames uploaded successfully',
    icon: <Upload className="h-4 w-4" />,
    status: 'completed',
    estimatedTime: 0
  },
  {
    id: 'analysis',
    name: 'Image Analysis',
    description: 'Analyzing frame geometry and features',
    icon: <Cpu className="h-4 w-4" />,
    status: 'processing',
    estimatedTime: 15
  },
  {
    id: 'reconstruction',
    name: '3D Reconstruction',
    description: 'Building 3D mesh from photogrammetry data',
    icon: <Cpu className="h-4 w-4" />,
    status: 'pending',
    estimatedTime: 20
  },
  {
    id: 'optimization',
    name: 'Model Optimization',
    description: 'Optimizing mesh and textures for web use',
    icon: <Cpu className="h-4 w-4" />,
    status: 'pending',
    estimatedTime: 10
  },
  {
    id: 'export',
    name: 'GLB Export',
    description: 'Preparing final GLB file for download',
    icon: <Download className="h-4 w-4" />,
    status: 'pending',
    estimatedTime: 5
  }
];

export default function ProcessingIndicator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(45); // minutes

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
      
      setTimeRemaining(prev => {
        const newTime = prev - 0.5;
        return newTime <= 0 ? 0 : newTime;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          3D Model Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% • {formatTime(timeRemaining)} remaining
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Processing Steps */}
        <div className="space-y-3">
          {PROCESSING_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                step.status === 'completed'
                  ? 'bg-green-50 border-green-200'
                  : step.status === 'processing'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 ${
                step.status === 'completed'
                  ? 'text-green-600'
                  : step.status === 'processing'
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.icon
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{step.name}</span>
                  <Badge 
                    variant={
                      step.status === 'completed' 
                        ? 'default' 
                        : step.status === 'processing'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="text-xs"
                  >
                    {step.status === 'completed' 
                      ? 'Done' 
                      : step.status === 'processing'
                      ? 'Processing'
                      : 'Pending'
                    }
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {step.status === 'processing' && (
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">What's Happening?</h4>
              <p className="text-sm text-blue-800">
                Polycam is analyzing your 20 frames to create a detailed 3D model of your equipment. 
                The AI is identifying common features across images and reconstructing the 3D geometry. 
                You'll receive an email notification when your GLB file is ready for download.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button variant="outline" disabled>
            <Clock className="h-4 w-4 mr-2" />
            Processing... Check back in {formatTime(timeRemaining)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

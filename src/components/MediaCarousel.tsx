"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/New Images/Truxor_Cutting-Collecting_1_web.jpg',
    alt: 'Our professional equipment in action',
    title: 'Equipment in Action',
    description: 'Professional pond cleanup equipment operating in challenging conditions'
  },
  {
    id: '2',
    type: 'image',
    src: '/images/New Images/Truxor_Cutting-Collecting_10_web.jpg',
    alt: 'Cutting operations',
    title: 'Cutting Operations',
    description: 'Precise cutting of underwater vegetation and reed beds'
  },
  {
    id: '3',
    type: 'image',
    src: '/images/New Images/Truxor_Cutting-Collecting_15_web.jpg',
    alt: 'Pulling operations',
    title: 'Pulling Operations',
    description: 'Powerful pulling capabilities for debris and vegetation removal'
  },
  {
    id: '4',
    type: 'image',
    src: '/images/New Images/Truxor_Cutting-Collecting_20_web.jpg',
    alt: 'Shoreline restoration',
    title: 'Shoreline Restoration',
    description: 'Restoring damaged shorelines and improving water quality'
  },
  {
    id: '5',
    type: 'image',
    src: '/images/New Images/Truxor_Cutting-Collecting_25_web.jpg',
    alt: 'Emergency response',
    title: 'Emergency Response',
    description: 'Rapid response capabilities for urgent cleanup situations'
  }
];

export default function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = MEDIA_ITEMS[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    if (currentItem.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (currentItem.type === 'video' && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Equipment Gallery</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {currentIndex + 1} of {MEDIA_ITEMS.length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Main Media Display */}
          <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentItem.src}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                muted={isMuted}
              />
            )}

            {/* Video Controls Overlay */}
            {currentItem.type === 'video' && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={togglePlay}
                  className="bg-black/50 text-white hover:bg-black/70"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleMute}
                  className="bg-black/50 text-white hover:bg-black/70"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            )}

            {/* Navigation Arrows */}
            <Button
              variant="secondary"
              size="sm"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Media Info */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{currentItem.title}</h3>
            <p className="text-sm text-muted-foreground">{currentItem.description}</p>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {MEDIA_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-blue-500 scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={item.thumbnail || item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Keyboard Navigation Info */}
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Use arrow keys or click thumbnails to navigate
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

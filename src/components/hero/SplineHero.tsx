'use client'

import { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { Camera, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RobotScene } from "@/components/3d/RobotScene";

export function SplineHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  return (
    <Card 
      className="w-full max-w-7xl h-[500px] md:h-[600px] lg:h-[650px] relative overflow-hidden border-primary/20"
      style={{
        background: 'linear-gradient(135deg, hsl(180 30% 92%) 0%, hsl(180 25% 96%) 50%, hsl(180 20% 94%) 100%)',
        boxShadow: '0 8px 32px hsl(175 70% 35% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.5)'
      }}
      onMouseMove={onMouseMove}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(175 70% 45%)"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 w-fit">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI-Powered & Teal
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            SmartShop
          </h1>
          
          <p className="mt-4 text-muted-foreground max-w-lg text-lg leading-relaxed">
            Experience shopping reimagined for accessibility. Point
            your camera, hear product details, and shop with your
            voice.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="hero" size="lg" asChild className="shadow-lg">
              <Link to="/scan">
                <Camera className="mr-2 h-5 w-5" />
                START SCANNING
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="border-primary/30">
              <Mic className="mr-2 h-5 w-5" />
              Voice Guide
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { label: 'Voice First', value: 'TTS' },
              { label: 'AI Detection', value: 'YOLOv8' },
              { label: 'Accessible', value: 'WCAG' },
            ].map((feature) => (
              <div key={feature.label} className="text-center">
                <div className="text-2xl font-display font-bold text-primary">
                  {feature.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right content - 3D Robot Scene */}
        <div className="flex-1 relative min-h-[280px] md:min-h-0">
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(180 25% 94% / 0.5) 0%, transparent 50%)',
            }}
          />
          <RobotScene mousePosition={mousePosition} />
        </div>
      </div>
    </Card>
  );
}

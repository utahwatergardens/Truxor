"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Check, Fuel, Gauge, Waves, Wrench, Shield, Download, Hand, Leaf, Ruler, ShipWheel, Zap, Trees, Phone, MessageCircle, Tractor, Droplets, Wheat, TreePine, Building2, Factory, Scissors, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Optional 3D viewer placeholder (swap with react-three-fiber or model-viewer as needed)

// 3D viewer with GLB support and attachment controls
const ModelViewer = dynamic(() => import("@/components/Simple3DViewer"), { ssr: false, loading: () => <div className="h-96 w-full animate-pulse rounded-2xl bg-muted" /> });

// Contact form with CRM integration
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });

// Enhanced video player for 3D renders
const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), { ssr: false });

// --- Editable content for Pond Cleanup business ---
const BRAND = {
  name: "PondCleanup.com",
  tagline: "Professional pond cleanup and lake weed removal services",
  heroVideo: "/videos/equipment-3d-render.mp4", // Your new 3D render
  poster: "/images/New Images/Truxor_Cutting-Collecting_1_web.jpg",
  brochure: "/downloads/pond-cleanup-services.pdf",
};

const SERVICES = {
  excavation: "Aquatic excavation and dredging",
  vegetation: "Invasive vegetation removal",
  shoreline: "Shoreline restoration and cleanup",
  debris: "Debris and sediment removal",
  maintenance: "Preventive maintenance programs",
  emergency: "Emergency response services",
  habitat: "Habitat restoration projects",
  compliance: "Environmental compliance work",
};

const JOB_TYPES = [
  { icon: <Wrench className="h-5 w-5" />, name: "Excavation & Dredging", desc: "Remove sediment, muck, and debris from ponds and lakes." },
  { icon: <Leaf className="h-5 w-5" />, name: "Vegetation Control", desc: "Clear invasive weeds, reeds, and overgrown vegetation." },
  { icon: <Hand className="h-5 w-5" />, name: "Shoreline Restoration", desc: "Clean and restore eroded or overgrown shorelines." },
  { icon: <Shield className="h-5 w-5" />, name: "Emergency Response", desc: "Rapid response for flooding, debris removal, and urgent situations." },
];

const CUT_CAPABILITIES = [
  { icon: <Leaf className="h-5 w-5" />, name: "Underwater Weeds", desc: "Cut and remove submerged vegetation that chokes ponds and lakes." },
  { icon: <Waves className="h-5 w-5" />, name: "Waterlogged Retaining Basins", desc: "Clear overgrown basins and restore proper water flow." },
  { icon: <Zap className="h-5 w-5" />, name: "Dense Reed Beds", desc: "Cut through thick reeds and cattails that block access." },
  { icon: <Shield className="h-5 w-5" />, name: "Invasive Species", desc: "Remove aggressive plants that threaten native ecosystems." },
];

const PULL_CAPABILITIES = [
  { icon: <Trees className="h-5 w-5" />, name: "Picking Up Trees", desc: "Remove fallen trees and large debris from water bodies." },
  { icon: <Leaf className="h-5 w-5" />, name: "Pulling Out Cattails", desc: "Extract root systems and prevent regrowth." },
  { icon: <Hand className="h-5 w-5" />, name: "Debris Removal", desc: "Pull out large objects and obstacles from ponds and lakes." },
];

const SITUATIONS = [
  { icon: <Waves className="h-5 w-5" />, title: "Farm Ponds", desc: "Restore irrigation ponds and livestock watering areas." },
  { icon: <Fuel className="h-5 w-5" />, title: "Sediment Buildup", desc: "Remove years of accumulated muck and debris." },
  { icon: <Shield className="h-5 w-5" />, title: "Flood Damage", desc: "Emergency cleanup after storms and flooding." },
  { icon: <Gauge className="h-5 w-5" />, title: "Shoreline Erosion", desc: "Restore damaged or eroded shorelines." },
];

const FAQ = [
  { q: "How much does pond cleanup cost?", a: "Pond cleanup costs vary based on size, condition, and specific services needed. We offer free consultations and quotes. Typical projects range from $500-$5,000 depending on pond size and complexity. Farm ponds often qualify for agricultural service rates." },
  { q: "Do you work with farmers and agricultural operations?", a: "Absolutely! We specialize in farm pond maintenance, irrigation system cleanup, and livestock watering area restoration. Our equipment is perfect for agricultural applications and we understand the unique needs of farming operations." },
  { q: "What types of jobs do you handle?", a: "We handle excavation, vegetation removal, shoreline restoration, emergency response, cut operations (underwater weeds, reed beds), and pull operations (trees, cattails, debris removal). From small farm ponds to large commercial lakes, we have the equipment and expertise." },
  { q: "Do you offer maintenance plans?", a: "Yes! We offer seasonal maintenance plans to keep your pond healthy year-round. This includes regular inspections, vegetation control, and water quality monitoring to prevent future problems. Perfect for maintaining farm irrigation systems." },
  { q: "How quickly can you respond to emergencies?", a: "We provide rapid response for emergency situations like flooding, storm damage, or urgent cleanup needs. Contact us immediately for emergency services." },
];



export default function PondCleanupLanding() {
  const [email, setEmail] = useState("");

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND.name,
    "description": `${BRAND.name} - ${BRAND.tagline}`,
    "url": "https://pondcleanup.com",
    "telephone": "+1-801-555-0123",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Utah",
      "addressRegion": "UT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7608",
      "longitude": "-111.8910"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Utah"
    }
  }), []);

  useEffect(() => {
    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLd]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/New Images/Truxor_Cutting-Collecting_1_web.jpg" 
            alt="Professional equipment operating in pond cleanup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 py-28 text-white">
          <Badge className="w-fit glass-effect shadow-glow shimmer">Professional Service</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl gradient-text"
          >
            {BRAND.name}
          </motion.h1>
          <p className="max-w-2xl text-lg/7 md:text-xl/8">
            {BRAND.tagline} — engineered for dredging, weed control, habitat restoration, and rapid shoreline response using our professional equipment. 
            Specialized services for farmers, ranchers, and agricultural operations.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="lg" className="gradient-bg hover-lift shadow-glow">Get Free Quote</Button>
            <Button variant="secondary" size="lg" className="glass-effect hover-lift" asChild>
              <a href={BRAND.brochure} download>
                <Download className="mr-2 h-4 w-4" /> Download brochure
              </a>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </section>

      {/* 3D EQUIPMENT RENDER SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 water-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 gradient-text">
            See Our Equipment in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our professional pond cleanup equipment demonstrate its capabilities in this detailed 3D render
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative float-animation">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
            <VideoPlayer
              src="/videos/equipment-3d-render.mp4"
              poster="/images/New Images/Truxor_Cutting-Collecting_1_web.jpg"
              title="Professional Equipment 3D Render"
              description="Amphibious pond cleanup equipment with cutting and collection capabilities"
              autoPlay={true}
              loop={true}
              muted={true}
              controls={true}
            />
          </div>
        </div>
      </section>

      {/* SERVICES BAR */}
      <div className="border-b glass-effect shadow-glow">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <ServiceItem label="Excavation" value={SERVICES.excavation} />
            <ServiceItem label="Vegetation" value={SERVICES.vegetation} />
            <ServiceItem label="Shoreline" value={SERVICES.shoreline} />
            <ServiceItem label="Emergency" value={SERVICES.emergency} />
            <div className="ml-auto">
              <Button size="sm" variant="outline" className="gradient-bg hover-lift">Get Quote</Button>
            </div>
          </div>
        </div>
      </div>

      {/* JOB TYPES & CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 py-16 water-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 gradient-text">
            Professional Equipment & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced amphibious equipment for all types of pond and lake maintenance
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden hover-lift shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Our Equipment in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelViewer />
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Types of Jobs We Handle</CardTitle>
              <p className="text-muted-foreground">
                Our machine is a highly capable amphibious tool carrier designed to tackle a wide variety of challenging jobs—especially in wet environments such as lakes, rivers, and wetlands. It shines thanks to its robust powertrain, reliable hydraulics, and extensive accessory options.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Core Functions & Job Types */}
              <div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">Core Functions & Job Types</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Aquatic Vegetation Management */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Aquatic Vegetation Management</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg border p-3 hover-lift glass-effect">
                        <div className="font-medium text-sm">Cutting / Trimming</div>
                        <div className="text-xs text-muted-foreground">Efficiently slices through dense aquatic plants like reeds, water lilies, and overgrown vegetation using sharp, adjustable cutting tools. This supports habitat restoration and waterway health.</div>
                      </div>
                      <div className="rounded-lg border p-3 hover-lift glass-effect">
                        <div className="font-medium text-sm">Collecting & Raking</div>
                        <div className="text-xs text-muted-foreground">Once vegetation is cut, our machine can rake and collect debris, including logs, floating biomass, and plant matter—reducing eutrophication risk and improving aesthetics.</div>
                      </div>
                    </div>
                  </div>

                  {/* Excavation & Digging */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Excavation & Digging</h4>
                    </div>
                    <div className="rounded-lg border p-3 hover-lift glass-effect">
                      <div className="font-medium text-sm">Digging in Wetlands</div>
                      <div className="text-xs text-muted-foreground">Equipped with digging arms and interchangeable buckets or grip tools, our machine can handle excavation tasks even in hard-to-reach aquatic environments.</div>
                    </div>
                  </div>

                  {/* Dredging & Sediment Removal */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Waves className="h-5 w-5 text-cyan-600" />
                      <h4 className="font-semibold">Dredging & Sediment Removal</h4>
                    </div>
                    <div className="rounded-lg border p-3 hover-lift glass-effect">
                      <div className="font-medium text-sm">Suction or Pump Dredging</div>
                      <div className="text-xs text-muted-foreground">With specialized dredging attachments—such as pump tools—our machine effectively clears silt, sludge, and sediment, maintaining water depth and quality.</div>
                    </div>
                  </div>

                  {/* Cleanup & Pollution Control */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold">Cleanup & Pollution Control</h4>
                    </div>
                    <div className="rounded-lg border p-3 hover-lift glass-effect">
                      <div className="font-medium text-sm">Debris & Contamination Removal</div>
                      <div className="text-xs text-muted-foreground">Our machine manages floating trash, plastic waste, and invasive aquatic plants. It is also frequently used in urban rivers, nature reserves, wastewater treatment sites, and oil spill emergencies.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environments & Use Cases */}
              <div>
                <h3 className="text-xl font-semibold mb-6 gradient-text">Environments & Use Cases</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-xl border p-6 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-100">
                        <TreePine className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="font-semibold text-base">Sensitive Natural Habitats</span>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Nature reserves, coastal meadows. Its amphibious, low-impact design makes it especially suited for delicate ecosystems.
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Low-impact operation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Ecosystem preservation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Precision control</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-6 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="font-semibold text-base">Urban Waterways & Canals</span>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Compact, nimble, and efficient, our machine provides vital maintenance in cities.
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Urban accessibility</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Space-efficient operation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>City infrastructure support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-6 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <Factory className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="font-semibold text-base">Industrial Settings</span>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Used for pond cleaning, sediment clearing, and sludge removal in industrial wetlands and retention basins.
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span>Heavy-duty performance</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span>Industrial-grade reliability</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span>High-capacity operations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool & Attachment Overview */}
              <div>
                <h3 className="text-xl font-semibold mb-6 gradient-text">Tool & Attachment Overview</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Scissors className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-sm">Cutting Tools</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Dorocutter D20/D30/D40, ESM series (20–60), ideal for vegetation removal at varied depths.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Hydraulic cutting knives</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Telescopic options</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <Hand className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-semibold text-sm">Collecting Tools</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Reed rake, high-tip rake, Doro grip, collection harrow—equipped for material gathering and removal.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Retractable sections</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Debris collection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <Wrench className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-sm">Digging Attachments</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Doro digger, outriggers, gripping tools optimized for excavation tasks.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        <span>Heavy-duty steel arm</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        <span>Stabilization support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-cyan-100">
                        <Droplets className="h-5 w-5 text-cyan-600" />
                      </div>
                      <span className="font-semibold text-sm">Dredging & Pumping</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Doro pump V3, feeder drill, pumps with screw feeders—engineered for sediment extraction.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>Hydraulic dredge pumps</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>Screw feeding system</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-red-100">
                        <Shield className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-semibold text-sm">Oil & Debris Cleanup</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Doroskimmer, Sala Rollpump, oil cleaning accessories—ideal for environmental remediation.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>Oil spill recovery</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>Environmental protection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-5 hover-lift glass-effect shadow-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Settings className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-semibold text-sm">Additional Tools</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Flail mulcher, wood chipper, spreaders, hydraulic propellers, tilt brackets, and more to expand functionality.
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Versatile attachments</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Expanded functionality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CUT & PULL CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Cut & Pull Capabilities</h2>
          <p className="text-lg text-muted-foreground">Specialized equipment for precise cutting and powerful pulling operations</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* CUT SECTION */}
          <Card className="overflow-hidden hover-lift shadow-glow">
            <CardHeader className="nature-gradient">
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-6 w-6" />
                Cut Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {CUT_CAPABILITIES.map((capability) => (
                  <div key={capability.name} className="flex gap-3 rounded-xl border p-4 hover-lift glass-effect">
                    <div className="flex-shrink-0">
                      {capability.icon}
                    </div>
                    <div>
                      <div className="font-medium">{capability.name}</div>
                      <div className="text-sm text-muted-foreground">{capability.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PULL SECTION */}
          <Card className="overflow-hidden hover-lift shadow-glow">
            <CardHeader className="water-gradient">
              <CardTitle className="flex items-center gap-2 text-white">
                <Hand className="h-6 w-6" />
                Pull Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {PULL_CAPABILITIES.map((capability) => (
                  <div key={capability.name} className="flex gap-3 rounded-xl border p-4 hover-lift glass-effect">
                    <div className="flex-shrink-0">
                      {capability.icon}
                    </div>
                    <div>
                      <div className="font-medium">{capability.name}</div>
                      <div className="text-sm text-muted-foreground">{capability.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FARM SERVICES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 nature-gradient">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tractor className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold">Agricultural Services</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Specialized pond and lake maintenance for farmers, ranchers, and agricultural operations. 
            Keep your irrigation systems flowing and livestock watering areas clean year-round.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="overflow-hidden hover-lift shadow-glow">
            <div className="relative h-48">
              <img 
                src="/images/New Images/Truxor_Cutting-Collecting_8_web.jpg" 
                alt="Farm pond irrigation system maintenance" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute top-4 left-4">
                <Droplets className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">Irrigation System Maintenance</div>
              <div className="text-sm text-muted-foreground mb-4">
                Keep your farm's irrigation ponds and water systems flowing efficiently. Remove sediment, 
                clear intake areas, and maintain proper water levels for optimal crop irrigation.
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Sediment removal from irrigation ponds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Intake screen and pipe cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Water level optimization</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift shadow-glow">
            <div className="relative h-48">
              <img 
                src="/images/New Images/Truxor_Cutting-Collecting_12_web.jpg" 
                alt="Livestock watering area cleanup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute top-4 left-4">
                <Wheat className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">Livestock Watering Areas</div>
              <div className="text-sm text-muted-foreground mb-4">
                Maintain clean, healthy watering areas for your livestock. Remove algae, vegetation, 
                and debris to ensure your animals have access to quality water year-round.
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Algae and vegetation control</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Debris removal from watering areas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Water quality improvement</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift shadow-glow">
            <div className="relative h-48">
              <img 
                src="/images/New Images/Truxor_Cutting-Collecting_16_web.jpg" 
                alt="Agricultural drainage system maintenance" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute top-4 left-4">
                <Tractor className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">Drainage & Flood Control</div>
              <div className="text-sm text-muted-foreground mb-4">
                Protect your crops and equipment with proper drainage system maintenance. 
                Clear ditches, culverts, and retention ponds to prevent flooding and water damage.
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Ditch and culvert cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Retention pond maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Emergency flood response</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Why Farmers Choose Our Equipment</h3>
            <div className="grid gap-6 md:grid-cols-2 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-green-700">Agricultural Expertise</h4>
                <p className="text-sm text-muted-foreground">
                  We understand the unique challenges of farm pond maintenance and agricultural water management. 
                  Our equipment is designed to handle the specific needs of farming operations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-700">Seasonal Flexibility</h4>
                <p className="text-sm text-muted-foreground">
                  We work around your farming schedule. Whether it's pre-planting cleanup or post-harvest maintenance, 
                  we're available when you need us most.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-700">Cost-Effective Solutions</h4>
                <p className="text-sm text-muted-foreground">
                  Our efficient equipment reduces labor costs and minimizes downtime. 
                  Preventative maintenance saves money compared to emergency repairs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-700">Environmental Stewardship</h4>
                <p className="text-sm text-muted-foreground">
                  We use environmentally responsible methods that protect your soil, water quality, 
                  and surrounding ecosystems while maintaining productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SITUATIONS WE HANDLE */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Situations We Handle</h2>
          <p className="text-lg text-muted-foreground">Common problems we solve for property owners and managers</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          {SITUATIONS.map((situation, i) => (
            <Card key={situation.title} className="overflow-hidden hover-lift shadow-glow">
              <div className="relative h-48">
                <img 
                  src={`/images/New Images/Truxor_Cutting-Collecting_${5 + i * 4}_web.jpg`} 
                  alt={`${situation.title} - ${situation.desc}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4">
                  {situation.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-lg font-semibold mb-2">{situation.title}</div>
                <div className="text-sm text-muted-foreground">{situation.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICES & CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Tabs defaultValue="services">
          <TabsList>
            <TabsTrigger value="services">Our Services</TabsTrigger>
            <TabsTrigger value="areas">Service Areas</TabsTrigger>
            <TabsTrigger value="process">Our Process</TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="mt-6">
            <ServicesGrid />
          </TabsContent>
          <TabsContent value="areas" className="mt-6">
            <ServiceAreas />
          </TabsContent>
          <TabsContent value="process" className="mt-6">
            <OurProcess />
          </TabsContent>
        </Tabs>
      </section>

      {/* ROI CALCULATOR */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ROI forecaster</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">Our professional equipment delivers exceptional value. Most clients see a return on investment within 6-12 months.</p>
              <div className="h-64 w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">40-60%</div>
                  <div className="text-sm text-gray-600">Typical time savings</div>
                  <div className="text-3xl font-bold text-green-600 mt-4 mb-2">$2K-5K</div>
                  <div className="text-sm text-gray-600">Average cost savings per project</div>
                </div>
              </div>
            </CardContent>
          </Card>

                      <ContactForm />
        </div>
      </section>

      {/* BEFORE & AFTER SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Amazing Transformations</h2>
          <p className="text-lg text-muted-foreground">See the incredible results our professional equipment delivers</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src="/images/before-after-1.png" 
                alt="Pond before cleanup - overgrown with weeds and algae" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Before</div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Complete Pond Restoration</h3>
              <p className="text-muted-foreground">This pond was completely overrun with invasive vegetation and algae. Our professional equipment restored it to pristine condition.</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src="/images/before-after-2.png" 
                alt="Pond after cleanup - crystal clear water with healthy ecosystem" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">After</div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Professional Results</h3>
              <p className="text-muted-foreground">Crystal clear water, restored ecosystem, and enhanced fish habitat - all achieved with precision equipment.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-8 water-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">Real feedback from satisfied customers across Utah</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              quote: "Their equipment saved our irrigation system! The pond was so clogged with sediment that our crops were suffering. They cleared it in one day and our water flow is better than ever.", 
              author: "John Davis",
              location: "Cache Valley, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_15_web.jpg"
            },
            { 
              quote: "Professional service from start to finish. Their expertise with aquatic vegetation control saved our livestock watering area from invasive species. Our cattle have clean water year-round now.", 
              author: "Mike Thompson",
              location: "Provo, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_20_web.jpg"
            },
            { 
              quote: "Outstanding results! Our farm pond was completely overrun with weeds and algae. The team came in with their professional equipment and restored it to pristine condition. Highly recommend for any farmer!", 
              author: "Lisa Chen",
              location: "Salt Lake City, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_25_web.jpg"
            },
          ].map((t, i) => (
            <Card key={i} className="overflow-hidden hover-lift shadow-glow">
              <div className="relative h-48">
                <img 
                  src={t.image} 
                  alt={`${t.author} testimonial - ${t.location}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex gap-1">
                  {[0, 1, 2, 3, 4].map(n => <Check key={n} className="h-4 w-4 text-yellow-500" />)}
                </div>
                <p className="text-base mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EQUIPMENT GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Equipment Gallery</h2>
          <p className="text-lg text-muted-foreground">See our professional equipment in action across various projects</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[
            "/images/New Images/Truxor_Cutting-Collecting_2_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_4_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_6_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_8_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_9_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_13_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_14_web.jpg",
            "/images/New Images/Truxor_Cutting-Collecting_17_web.jpg",
          ].map((image, i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg hover-lift shadow-glow">
              <img 
                src={image} 
                alt={`Professional equipment in action - image ${i + 1}`} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCES & FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Resources & FAQ</h2>
          <p className="text-lg text-muted-foreground">Helpful resources and answers to common questions</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="hover-lift shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Resources</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ResourceItem title="Operator handbook" href="#" />
              <ResourceItem title="Hydraulic schematics" href="#" />
              <ResourceItem title="Attachment compatibility chart" href="#" />
              <ResourceItem title="Environmental compliance guide" href="#" />
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FLOATING CONTACT BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full gradient-bg hover-lift pulse-glow"
          asChild
        >
          <a href="tel:+18015550123" className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
        </Button>
      </div>

      {/* FOOTER */}
      <footer className="border-t py-12 water-gradient">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-4">
          <div>
            <div className="text-xl font-semibold gradient-text">{BRAND.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">Professional pond cleanup and lake weed removal services in Utah.</p>
          </div>
          <div>
            <div className="font-medium">Contact</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Email: info@pondcleanup.com</li>
              <li>Phone: +1 (801) 555-0123</li>
              <li>Service Area: Utah Statewide</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Legal</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Warranty</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Newsletter</div>
            <div className="mt-2 flex gap-2">
              <Input placeholder="you@company.com" />
              <Button className="gradient-bg hover-lift">Join</Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function ServiceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ServicesGrid() {
  const services = [
    {
      name: "Aquatic Vegetation Management",
      desc: "Professional cutting and collecting of dense aquatic plants, reeds, and invasive vegetation",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      features: ["Dorocutter D20/D30/D40 series", "ESM precision cutting blades", "Reed rake & collection systems"]
    },
    {
      name: "Excavation & Dredging",
      desc: "Advanced sediment removal and wetland excavation with specialized hydraulic equipment",
      icon: <Wrench className="h-5 w-5 text-blue-600" />,
      features: ["Doro Pump V3 with screw feeding", "Doro Digger T-series", "Up to 80 m³/h capacity"]
    },
    {
      name: "Environmental Cleanup",
      desc: "Oil spill recovery, debris removal, and pollution control for sensitive ecosystems",
      icon: <Shield className="h-5 w-5 text-red-600" />,
      features: ["Doroskimmer 800", "Sala Rollpump systems", "Environmental remediation"]
    },
    {
      name: "Shoreline Restoration",
      desc: "Complete shoreline cleanup and restoration with precision cutting and collection tools",
      icon: <Hand className="h-5 w-5 text-orange-600" />,
      features: ["High-tip rake systems", "DoroGrip versatile tools", "Erosion control"]
    },
    {
      name: "Agricultural Services",
      desc: "Farm pond maintenance, irrigation system cleanup, and livestock watering area restoration",
      icon: <Tractor className="h-5 w-5 text-green-600" />,
      features: ["Farm-specific equipment", "Irrigation maintenance", "Agricultural drainage"]
    },
    {
      name: "Emergency Response",
      desc: "Rapid deployment for flooding, storm damage, and urgent environmental situations",
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      features: ["24/7 emergency response", "Storm damage cleanup", "Flood control systems"]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 gradient-text">Professional Equipment Capabilities</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our amphibious machine is equipped with the full suite of original tools, featuring powerful hydraulic outputs 
          and quick-change bracket (X4) system for maximum versatility and efficiency.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {services.map(service => (
          <div key={service.name} className="rounded-xl border p-6 hover-lift glass-effect shadow-glow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-100">
                {service.icon}
              </div>
              <h4 className="font-semibold text-lg">{service.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {service.desc}
            </p>
            <div className="space-y-2">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-xl border glass-effect">
        <h4 className="font-semibold mb-3 gradient-text">Equipment Specifications</h4>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="space-y-2">
            <div className="font-medium">Cutting Capabilities</div>
            <div className="text-muted-foreground">• Depth: 50-80cm (ESM series)</div>
            <div className="text-muted-foreground">• Telescopic options available</div>
            <div className="text-muted-foreground">• Double-acting Busati blades</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Dredging Performance</div>
            <div className="text-muted-foreground">• Capacity: Up to 80 m³/h</div>
            <div className="text-muted-foreground">• Screw feeding system</div>
            <div className="text-muted-foreground">• Anti-clogging design</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Environmental Features</div>
            <div className="text-muted-foreground">• Low-impact operation</div>
            <div className="text-muted-foreground">• Amphibious design</div>
            <div className="text-muted-foreground">• Quick-change attachments</div>
          </div>
        </div>
      </div>
    </div>
  );
}



function ServiceAreas() {
  const areas = [
    // Utah Coverage
    { 
      area: "Utah - Salt Lake Valley", 
      services: "Full range of pond and lake services, urban waterway maintenance",
      region: "UT"
    },
    { 
      area: "Utah - Park City & Mountains", 
      services: "Mountain property water features, ski resort maintenance",
      region: "UT"
    },
    { 
      area: "Utah - Provo & Utah Valley", 
      services: "Residential and commercial pond cleanup, university campus services",
      region: "UT"
    },
    { 
      area: "Utah - Ogden & Northern", 
      services: "Industrial and recreational water management, Weber River projects",
      region: "UT"
    },
    { 
      area: "Utah - St. George & Southern", 
      services: "Desert landscape water features, golf course maintenance",
      region: "UT"
    },
    
    // Wyoming Coverage
    { 
      area: "Wyoming - Jackson Hole", 
      services: "Mountain lake restoration, resort property maintenance",
      region: "WY"
    },
    { 
      area: "Wyoming - Cheyenne & Southeast", 
      services: "Agricultural pond maintenance, ranch water management",
      region: "WY"
    },
    { 
      area: "Wyoming - Casper & Central", 
      services: "Industrial water treatment, North Platte River projects",
      region: "WY"
    },
    { 
      area: "Wyoming - Cody & Northwest", 
      services: "Yellowstone region lakes, recreational water features",
      region: "WY"
    },
    
    // Idaho Coverage
    { 
      area: "Idaho - Boise & Treasure Valley", 
      services: "Urban pond maintenance, Boise River restoration",
      region: "ID"
    },
    { 
      area: "Idaho - Coeur d'Alene & North", 
      services: "Lake Coeur d'Alene services, resort property maintenance",
      region: "ID"
    },
    { 
      area: "Idaho - Idaho Falls & East", 
      services: "Snake River projects, agricultural water management",
      region: "ID"
    },
    { 
      area: "Idaho - Twin Falls & South", 
      services: "Desert irrigation systems, Snake River Canyon projects",
      region: "ID"
    },
    
    // Arizona Coverage
    { 
      area: "Arizona - Phoenix Metro", 
      services: "Desert landscape water features, golf course maintenance",
      region: "AZ"
    },
    { 
      area: "Arizona - Tucson & Southern", 
      services: "Sonoran Desert water features, university campus services",
      region: "AZ"
    },
    { 
      area: "Arizona - Flagstaff & Northern", 
      services: "Mountain lake restoration, forest service projects",
      region: "AZ"
    },
    { 
      area: "Arizona - Sedona & Central", 
      services: "Red rock water features, resort property maintenance",
      region: "AZ"
    },
    
    // Multi-State Services
    { 
      area: "Emergency Response", 
      services: "24/7 emergency services across all four states",
      region: "ALL"
    },
    { 
      area: "Large-Scale Projects", 
      services: "Multi-state water management and restoration projects",
      region: "ALL"
    }
  ];
  
  const getRegionColor = (region: string) => {
    switch(region) {
      case 'UT': return 'bg-blue-100 text-blue-800';
      case 'WY': return 'bg-green-100 text-green-800';
      case 'ID': return 'bg-red-100 text-red-800';
      case 'AZ': return 'bg-orange-100 text-orange-800';
      case 'ALL': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 gradient-text">Multi-State Service Coverage</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Professional pond and lake cleanup services across Utah, Wyoming, Idaho, and Arizona. 
          Our amphibious equipment is perfectly suited for the diverse environments and water management needs of the Intermountain West.
        </p>
      </div>
      
      <div className="grid gap-4">
        {areas.map(area => (
          <div key={area.area} className="rounded-xl border p-4 hover-lift glass-effect shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-base">{area.area}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRegionColor(area.region)}`}>
                    {area.region === 'ALL' ? 'Multi-State' : area.region}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{area.services}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-xl border glass-effect">
        <h4 className="font-semibold mb-4 gradient-text">Regional Specializations</h4>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-blue-600">Utah</div>
            <div className="text-muted-foreground">• Mountain lakes & reservoirs</div>
            <div className="text-muted-foreground">• Desert water features</div>
            <div className="text-muted-foreground">• Agricultural irrigation</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-green-600">Wyoming</div>
            <div className="text-muted-foreground">• Ranch pond maintenance</div>
            <div className="text-muted-foreground">• Yellowstone region</div>
            <div className="text-muted-foreground">• Industrial water treatment</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-red-600">Idaho</div>
            <div className="text-muted-foreground">• Snake River projects</div>
            <div className="text-muted-foreground">• Resort lake maintenance</div>
            <div className="text-muted-foreground">• Agricultural drainage</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-orange-600">Arizona</div>
            <div className="text-muted-foreground">• Desert landscape features</div>
            <div className="text-muted-foreground">• Golf course maintenance</div>
            <div className="text-muted-foreground">• Mountain lake restoration</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 rounded-xl border glass-effect bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="text-center">
          <h4 className="font-semibold mb-2 gradient-text">Outside Our Service Area?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Don't see your location listed? We're always expanding our service areas and may be able to help with your project. 
            Our specialized amphibious equipment can handle unique challenges that other services can't.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="text-xs text-muted-foreground">
              <strong>Give us a call anyway!</strong> We'll discuss your specific needs and may be able to accommodate your project.
            </div>
            <Button className="gradient-bg hover-lift shadow-glow">
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Serving Utah, Wyoming, Idaho, and Arizona with professional pond and lake cleanup services. 
        Emergency response available 24/7 across all service areas.
      </p>
    </div>
  );
}

function OurProcess() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="hover-lift shadow-glow">
        <CardHeader>
          <CardTitle className="gradient-text">Our Process</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <InfoLine icon={<Ruler className="h-4 w-4" />} label="1. Assessment" value="Site evaluation and project planning" />
          <InfoLine icon={<ShipWheel className="h-4 w-4" />} label="2. Proposal" value="Detailed quote and timeline" />
          <InfoLine icon={<Waves className="h-4 w-4" />} label="3. Execution" value="Professional equipment deployment" />
          <InfoLine icon={<Shield className="h-4 w-4" />} label="4. Completion" value="Quality check and follow-up" />
        </CardContent>
      </Card>
      <Card className="hover-lift shadow-glow">
        <CardHeader>
          <CardTitle className="gradient-text">Why Choose Us</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <InfoLine icon={<Shield className="h-4 w-4" />} label="Experience" value="Years of professional pond cleanup" />
          <InfoLine icon={<Wrench className="h-4 w-4" />} label="Equipment" value="Advanced amphibious machinery" />
          <InfoLine icon={<Hand className="h-4 w-4" />} label="Service" value="Reliable, on-time, professional" />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3 hover-lift glass-effect">
      <div className="flex items-center gap-2">
        {icon}<span className="text-muted-foreground">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ResourceItem({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} className="flex items-center justify-between rounded-xl border p-4 hover-lift glass-effect">
      <span>{title}</span>
      <Button variant="secondary" size="sm" className="gradient-bg hover-lift">Open</Button>
    </a>
  );
}

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
import { Check, Fuel, Gauge, Waves, Wrench, Shield, Download, Hand, Leaf, Ruler, ShipWheel, Zap, Trees, Phone, MessageCircle, Tractor, Droplets, Wheat, TreePine, Building2, Factory, Scissors, Settings, MapPin, Clock, Grip } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Optional 3D viewer placeholder (swap with react-three-fiber or model-viewer as needed)

// 3D viewer with GLB support and attachment controls
const ModelViewer = dynamic(() => import("@/components/Simple3DViewer"), { ssr: false, loading: () => <div className="h-96 w-full animate-pulse rounded-2xl bg-muted" /> });

// Contact form with CRM integration
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });

// Enhanced video player for equipment demonstrations
const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), { ssr: false });

// --- Editable content for Pond Cleanup business ---
const BRAND = {
  name: "PondCleanup.com",
  tagline: "Professional pond cleanup and lake weed removal services",
  heroVideo: "/videos/equipment-3d-render.mp4", // Professional equipment demonstration
  poster: "/images/New Images/Truxor_Cutting-Collecting_1_web.jpg",
  brochure: "/downloads/pond-cleanup-services-brochure.html",
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
  { 
    icon: <Scissors className="h-5 w-5" />, 
    name: "Doro Cutter D20", 
    desc: "Hydraulic cutter for aquatic vegetation. Depth: ~1m (3.28ft), Width: ~4m (13.1ft). Perfect for standard cutting operations." 
  },
  { 
    icon: <Scissors className="h-5 w-5" />, 
    name: "Doro Cutter D30", 
    desc: "Enhanced cutting depth of ~1.4m (4.6ft) with same ~4m width. Ideal for deeper vegetation control." 
  },
  { 
    icon: <Scissors className="h-5 w-5" />, 
    name: "Doro Cutter D40", 
    desc: "Telescopic deep-cut tool: 0.2-2.1m (0.65-6.88ft) depth, up to 4m width. Hydraulic drift for precision." 
  },
  { 
    icon: <Scissors className="h-5 w-5" />, 
    name: "ESM Series (20-60)", 
    desc: "Double-action Busati knives for wetlands. ESM20: ~0.5m, ESM30: ~0.3m, ESM50: ~0.8m with collection." 
  },
];

const PULL_CAPABILITIES = [
  { 
    icon: <Hand className="h-5 w-5" />, 
    name: "Lifting Arm Capacity", 
    desc: "~350-400kg lifting power via X4 quick-change bracket. Vertical force for excavation and gripping operations." 
  },
  { 
    icon: <Wrench className="h-5 w-5" />, 
    name: "Doro Digger", 
    desc: "Max depth: 3m, Lift height: 2.9m, Reach radius: 4m (8m diameter). Outriggers stabilize up to 2m deep." 
  },
  { 
    icon: <Grip className="h-5 w-5" />, 
    name: "Doro Grip", 
    desc: "Working depth up to ~1.7m with telescopic extension. Width: 0.49-1.2m. Grabs debris, roots, sediment." 
  },
];

const SITUATIONS = [
  { 
    icon: <Tractor className="h-5 w-5" />, 
    title: "Farm Ponds", 
    desc: "Restore irrigation ponds and livestock watering areas.",
    features: ["Irrigation system maintenance", "Livestock water quality", "Agricultural compliance"]
  },
  { 
    icon: <Waves className="h-5 w-5" />, 
    title: "Sediment Buildup", 
    desc: "Remove years of accumulated muck and debris.",
    features: ["Dredging operations", "Sludge removal", "Depth restoration"]
  },
  { 
    icon: <Shield className="h-5 w-5" />, 
    title: "Flood Damage", 
    desc: "Emergency cleanup after storms and flooding.",
    features: ["24/7 emergency response", "Debris removal", "Infrastructure protection"]
  },
  { 
    icon: <Leaf className="h-5 w-5" />, 
    title: "Invasive Vegetation", 
    desc: "Control and remove aggressive aquatic plants.",
    features: ["Reed and cattail removal", "Weed control", "Habitat restoration"]
  },
  { 
    icon: <Gauge className="h-5 w-5" />, 
    title: "Shoreline Erosion", 
    desc: "Restore damaged or eroded shorelines.",
    features: ["Erosion control", "Bank stabilization", "Beach restoration"]
  },
  { 
    icon: <Droplets className="h-5 w-5" />, 
    title: "Water Quality Issues", 
    desc: "Improve water clarity and ecosystem health.",
    features: ["Algae control", "Nutrient management", "Oxygen restoration"]
  },
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
  const [showDiagramsModal, setShowDiagramsModal] = useState(false);

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
            <Button size="lg" className="gradient-bg hover-lift shadow-glow" asChild>
              <a href="#contact-form">Get Free Quote</a>
            </Button>
            <Button variant="secondary" size="lg" className="glass-effect hover-lift" asChild>
              <a href={BRAND.brochure} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download brochure
              </a>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </section>

      {/* EQUIPMENT VIDEO DEMONSTRATION SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 water-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 gradient-text">
            Professional Equipment in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our specialized amphibious equipment demonstrate real pond cleanup capabilities and precision operations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative float-animation">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
            <VideoPlayer
              src="/videos/equipment-3d-render.mp4"
              poster="/images/New Images/Truxor_Cutting-Collecting_1_web.jpg"
              title="Professional Equipment Demonstration"
              description="Watch our machine tackle real pond cleanup challenges with precision and efficiency"
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
              <Button size="sm" variant="outline" className="gradient-bg hover-lift" asChild>
                <a href="#contact-form">Get Quote</a>
              </Button>
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
          <p className="text-lg text-muted-foreground">Professional cutting and excavation equipment with precise specifications</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* CUT SECTION */}
          <Card className="overflow-hidden hover-lift shadow-glow">
            <CardHeader className="nature-gradient">
              <CardTitle className="flex items-center gap-2 text-white">
                <Scissors className="h-6 w-6" />
                Cutting Capabilities
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
              
              {/* Cutting Summary */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">Cutting Specifications</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• <strong>Depth Range:</strong> 0.2m - 2.1m (0.65ft - 6.88ft)</div>
                  <div>• <strong>Width Coverage:</strong> Up to 4m (13.1ft)</div>
                  <div>• <strong>Specialized:</strong> Wetland cutting with Busati knives</div>
                  <div>• <strong>Precision:</strong> Hydraulic drift control for accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PULL SECTION */}
          <Card className="overflow-hidden hover-lift shadow-glow">
            <CardHeader className="water-gradient">
              <CardTitle className="flex items-center gap-2 text-white">
                <Hand className="h-6 w-6" />
                Excavation & Pulling
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
              
              {/* Pulling Summary */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Excavation Specifications</span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• <strong>Lifting Capacity:</strong> 350-400kg via X4 bracket</div>
                  <div>• <strong>Max Depth:</strong> 3m below water surface</div>
                  <div>• <strong>Reach Radius:</strong> 4m (8m diameter coverage)</div>
                  <div>• <strong>Stability:</strong> Outriggers support up to 2m depth</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Technical Summary Table */}
        <div className="mt-12">
          <Card className="hover-lift shadow-glow">
            <CardHeader className="gradient-bg text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Technical Specifications Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Capability Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Attachment</th>
                      <th className="text-left py-3 px-4 font-semibold">Depth / Specifications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Cutting</td>
                      <td className="py-3 px-4">D20</td>
                      <td className="py-3 px-4">~1m depth, ~4m width</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Cutting (Deeper)</td>
                      <td className="py-3 px-4">D30</td>
                      <td className="py-3 px-4">~1.4m depth, ~4m width</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Deep-cutting</td>
                      <td className="py-3 px-4">D40</td>
                      <td className="py-3 px-4">0.2-2.1m depth, up to 4m width</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Wetland cutting</td>
                      <td className="py-3 px-4">ESM series (20-50)</td>
                      <td className="py-3 px-4">~0.3-0.8m depth (model dependent)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Lifting capacity</td>
                      <td className="py-3 px-4">Lifting Arm</td>
                      <td className="py-3 px-4">~350-400kg lift force via X4 bracket</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Excavation</td>
                      <td className="py-3 px-4">Doro Digger</td>
                      <td className="py-3 px-4">Max depth 3m, lift 2.9m, reach radius 4m</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Grip work</td>
                      <td className="py-3 px-4">Doro Grip</td>
                      <td className="py-3 px-4">Working depth up to ~1.7m with extension</td>
                    </tr>
                  </tbody>
                </table>
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
      <section className="mx-auto max-w-7xl px-6 py-16 nature-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Situations We Handle</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional solutions for common water management challenges. Our amphibious equipment tackles problems 
            that traditional methods can't reach, delivering results for property owners and managers across the Intermountain West.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SITUATIONS.map((situation, i) => (
            <Card key={situation.title} className="overflow-hidden hover-lift shadow-glow bg-white/90 backdrop-blur-sm">
              <div className="relative h-56">
                <img 
                  src={`/images/New Images/Truxor_Cutting-Collecting_${8 + i * 3}_web.jpg`} 
                  alt={`${situation.title} - ${situation.desc}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <div className="text-white">
                    {situation.icon}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{situation.title}</h3>
                  <p className="text-sm text-white/90">{situation.desc}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-600">Key Services</span>
                  </div>
                  <ul className="space-y-2">
                    {situation.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3 gradient-text">Don't See Your Situation Listed?</h3>
            <p className="text-muted-foreground mb-6">
              Our professional amphibious equipment can handle unique challenges that other services can't reach. 
              Contact us to discuss your specific water management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="gradient-bg hover-lift shadow-glow" asChild>
                <a href="#contact-form">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Free Consultation
                </a>
              </Button>
              <Button variant="outline" className="hover-lift">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Photos
              </Button>
            </div>
          </div>
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

      {/* ROI CALCULATOR & CONTACT */}
      <section id="contact-form" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Calculate Your Investment Return</h2>
          <p className="text-lg text-muted-foreground">See how our professional equipment delivers exceptional value and rapid ROI</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Enhanced ROI Calculator */}
          <Card className="hover-lift shadow-glow">
            <CardHeader className="gradient-bg text-white">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Investment Return Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-sm text-muted-foreground">
                Our professional amphibious equipment delivers exceptional value. Most clients see a return on investment within 6-12 months through improved water management and reduced maintenance costs.
              </p>
              
              <div className="space-y-6">
                {/* Time Savings */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-800">Time Savings</span>
                    <span className="text-2xl font-bold text-blue-600">40-60%</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    Faster project completion compared to traditional methods
                  </div>
                </div>
                
                {/* Cost Savings */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-800">Cost Savings</span>
                    <span className="text-2xl font-bold text-green-600">$2K-5K</span>
                  </div>
                  <div className="text-sm text-green-700">
                    Average savings per project through efficient equipment
                  </div>
                </div>
                
                {/* ROI Timeline */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-800">ROI Timeline</span>
                    <span className="text-2xl font-bold text-purple-600">6-12 months</span>
                  </div>
                  <div className="text-sm text-purple-700">
                    Typical return on investment period for most projects
                  </div>
                </div>
                
                {/* Additional Benefits */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Reduced maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Improved water quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Enhanced property value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Environmental compliance</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Guaranteed Results</span>
                </div>
                <p className="text-sm text-yellow-700">
                  We stand behind our work with a satisfaction guarantee. If you're not completely satisfied with the results, we'll make it right.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form & Info */}
          <div className="space-y-4">
            <ContactForm />
            
            {/* Compact Contact Information */}
            <Card className="hover-lift shadow-glow">
              <CardHeader className="water-gradient text-white py-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Phone</div>
                      <div className="text-xs text-muted-foreground">+1-801-555-0123</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Email</div>
                      <div className="text-xs text-muted-foreground">info@pondcleanup.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Service Areas</div>
                      <div className="text-xs text-muted-foreground">Utah, Wyoming, Idaho, Arizona</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Zap className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Emergency</div>
                      <div className="text-xs text-muted-foreground">24/7 Response</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3 w-3 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-xs">Response Time</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    We respond within 2-4 hours during business hours. Emergency requests handled immediately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <p className="text-lg text-muted-foreground">Helpful resources, technical specifications, and answers to common questions</p>
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
              <ResourceItem title="Equipment specifications" onClick={() => setShowDiagramsModal(true)} />
              <ResourceItem title="Maintenance procedures" href="#" />
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
                    <div className="text-center">
                      <div className="flex justify-center gap-4 mb-2">
                        <div className="text-center">
                          <div>[ Cutting Tools ]</div>
                          <div className="text-xs text-muted-foreground">(Reeds, weeds)</div>
                        </div>
                        <div className="text-center">
                          <div>[ Dredge Pump ]</div>
                          <div className="text-xs text-muted-foreground">(Sludge)</div>
                        </div>
                        <div className="text-center">
                          <div>[ Excavator Arm ]</div>
                          <div className="text-xs text-muted-foreground">(Digging, pulling)</div>
                        </div>
                      </div>
                    </div>
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
                    <div className="text-center mb-2">[Quick-Change X4]</div>
                    <div className="text-center mb-2 text-xs text-muted-foreground">(350–400 kg lift cap)</div>
                    <div className="text-center">
                      <div className="flex justify-center gap-2 text-xs">
                        <div>[Doro Cutter]</div>
                        <div>[Doro Pump]</div>
                        <div>[Doro Digger]</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cutting System Specifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Cutting System</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">┌──────────────────────────┐</div>
                    <div className="text-center mb-2">│   Busati Double Knife    │</div>
                    <div className="text-center mb-2">└──────────────────────────┘</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">Cutting depth: 0.5–2.1 m</div>
                    <div className="text-center mb-2">Width: 2–4 m (depending on model)</div>
                    <div className="text-center mt-4">
                      <div className="text-xs font-semibold mb-1">Attachments:</div>
                      <div className="text-xs text-muted-foreground">• D20/D30/D40 = aquatic vegetation</div>
                      <div className="text-xs text-muted-foreground">• ESM20–60 = wetlands, coarse plants</div>
                    </div>
                  </div>
                </div>

                {/* Hydraulic Arm & Tools */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-center gradient-text">Hydraulic Arm & Tools</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                    <div className="text-center mb-2">[Hydraulic Arm]</div>
                    <div className="text-center mb-2">│</div>
                    <div className="text-center mb-2">┌───────┼────────┐</div>
                    <div className="text-center mb-2">│                │</div>
                    <div className="text-center mb-2">[Bucket / Shovel]   [Grip Tool]</div>
                    <div className="text-center mb-2 text-xs text-muted-foreground">(Digging 3m deep)   (Pulling roots, debris)</div>
                    <div className="text-center mt-4">
                      <div className="text-xs font-semibold mb-1">Specs:</div>
                      <div className="text-xs text-muted-foreground">• Max depth: 3 m</div>
                      <div className="text-xs text-muted-foreground">• Max lift: ~400 kg</div>
                      <div className="text-xs text-muted-foreground">• Max radius: 4 m</div>
                    </div>
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
                    <div className="text-center mb-2">│      │           │            │</div>
                    <div className="text-center mb-2">[Skimmer]  [Roll Pump]   [Doro Tank]  [Spreader]</div>
                    <div className="text-center mb-2 text-xs text-muted-foreground">(Oil)     (Sludge)      (Waste)     (Granules)</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setShowDiagramsModal(false)}
                  className="gradient-bg hover-lift"
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
          <h4 className="font-semibold mb-2 gradient-text">Find Services in Your City</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Browse our comprehensive list of 50+ cities across Utah, Idaho, Wyoming, and Arizona. 
            Each city page includes local service details, contact information, and nearby coverage areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <Button className="gradient-bg hover-lift shadow-glow" asChild>
              <a href="/cities">
                <MapPin className="h-4 w-4 mr-2" />
                View All Cities
              </a>
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <h5 className="font-semibold mb-2 gradient-text">Outside Our Service Area?</h5>
            <p className="text-sm text-muted-foreground mb-4">
              Don't see your location listed? We're always expanding our service areas and may be able to help with your project. 
              Our specialized amphibious equipment can handle unique challenges that other services can't.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <div className="text-xs text-muted-foreground">
                <strong>Give us a call anyway!</strong> We'll discuss your specific needs and may be able to accommodate your project.
              </div>
              <Button className="gradient-bg hover-lift shadow-glow" asChild>
                <a href="#contact-form">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
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

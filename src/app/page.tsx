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
import { Check, Fuel, Gauge, Waves, Wrench, Shield, Download, Hand, Leaf, Ruler, ShipWheel, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Optional 3D viewer placeholder (swap with react-three-fiber or model-viewer as needed)

// Optional 3D viewer placeholder
const ModelViewer = dynamic(() => import("@/components/ModelViewerPlaceholder"), { ssr: false, loading: () => <div className="h-96 w-full animate-pulse rounded-2xl bg-muted" /> });

// --- Editable content for Pond Cleanup business ---
const BRAND = {
  name: "PondCleanup.com",
  tagline: "Professional pond cleanup and lake weed removal services",
  heroVideo: "/hero/pond-cleanup-hero.mp4", // provide your own mp4/webm
  poster: "/images/New Images/Truxor_Cutting-Collecting_1_web.jpg",
  brochure: "/downloads/pond-cleanup-services.pdf",
};

const SPEC = {
  engine: "50 hp turbo diesel",
  draft: "Shallow water < 0.5m",
  transport: "Towable, rapid deploy",
  width: "2.05 m",
  weight: "1,850 kg (base)",
  payload: "Up to 500 kg",
  speed: "7 km/h water, 12 km/h land",
  emissions: "Stage V compliant",
};

const ATTACHMENTS = [
  { icon: <Wrench className="h-5 w-5" />, name: "Aquatic Cutter", desc: "Rotary cutter for dense reeds and cattails." },
  { icon: <Zap className="h-5 w-5" />, name: "Dredge Pump", desc: "Sediment removal up to 80 m³/h (site dependent)." },
  { icon: <Hand className="h-5 w-5" />, name: "Rake & Grab", desc: "Precision debris recovery and shoreline cleanup." },
  { icon: <Leaf className="h-5 w-5" />, name: "Weed Harvester", desc: "High-throughput aquatic vegetation collection." },
];

const BENEFITS = [
  { icon: <Waves className="h-5 w-5" />, title: "True Amphibious", desc: "Seamless land-water transitions reduce downtime." },
  { icon: <Fuel className="h-5 w-5" />, title: "Fuel Efficient", desc: "Optimized hydraulics and power curve minimize burn." },
  { icon: <Shield className="h-5 w-5" />, title: "Operator Safe", desc: "ROPS-ready platform and excellent visibility." },
  { icon: <Gauge className="h-5 w-5" />, title: "High Uptime", desc: "Modular attachments and fast service access." },
];

const FAQ = [
  { q: "How much does pond cleanup cost?", a: "Pond cleanup costs vary based on size, condition, and specific services needed. We offer free consultations and quotes. Typical projects range from $500-$5,000 depending on pond size and complexity." },
  { q: "How long does a typical cleanup take?", a: "Most pond cleanups are completed in 1-3 days depending on size and condition. Our professional equipment is highly efficient and can handle large areas quickly while maintaining quality results." },
  { q: "Do you offer maintenance plans?", a: "Yes! We offer seasonal maintenance plans to keep your pond healthy year-round. This includes regular inspections, vegetation control, and water quality monitoring to prevent future problems." },
  { q: "Is your equipment safe for fish and wildlife?", a: "Absolutely! Our equipment is designed to be environmentally friendly. It uses selective cutting methods that preserve beneficial vegetation while removing invasive species, ensuring minimal impact on fish and wildlife." },
];



export default function PondCleanupLanding() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
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
          <Badge className="w-fit bg-white/10 backdrop-blur">Professional Service</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            {BRAND.name}
          </motion.h1>
          <p className="max-w-2xl text-lg/7 md:text-xl/8">
            {BRAND.tagline} — engineered for dredging, weed control, habitat restoration, and rapid shoreline response using our professional equipment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="lg">Get Free Quote</Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={BRAND.brochure} download>
                <Download className="mr-2 h-4 w-4" /> Download brochure
              </a>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </section>

      {/* STICKY SPEC BAR */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <SpecItem label="Engine" value={SPEC.engine} />
            <SpecItem label="Payload" value={SPEC.payload} />
            <SpecItem label="Speed" value={SPEC.speed} />
            <SpecItem label="Emissions" value={SPEC.emissions} />
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs">Units</span>
              <Toggle pressed={units === "imperial"} onPressedChange={(p) => setUnits(p ? "imperial" : "metric")}>Imperial</Toggle>
            </div>
          </div>
        </div>
      </div>

      {/* 3D / VISUALIZER */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Explore Our Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelViewer />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mission-ready attachments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                { 
                  icon: <Wrench className="h-5 w-5" />, 
                  name: "Aquatic Cutter", 
                  desc: "Rotary cutter for dense reeds and cattails.",
                  image: "/images/New Images/Truxor_Cutting-Collecting_3_web.jpg"
                },
                { 
                  icon: <Zap className="h-5 w-5" />, 
                  name: "Dredge Pump", 
                  desc: "Sediment removal up to 80 m³/h (site dependent).",
                  image: "/images/New Images/Truxor_Cutting-Collecting_7_web.jpg"
                },
                { 
                  icon: <Hand className="h-5 w-5" />, 
                  name: "Rake & Grab", 
                  desc: "Precision debris recovery and shoreline cleanup.",
                  image: "/images/New Images/Truxor_Cutting-Collecting_11_web.jpg"
                },
                { 
                  icon: <Leaf className="h-5 w-5" />, 
                  name: "Weed Harvester", 
                  desc: "High-throughput aquatic vegetation collection.",
                  image: "/images/New Images/Truxor_Cutting-Collecting_16_web.jpg"
                },
              ].map((a) => (
                <div key={a.name} className="flex gap-3 rounded-xl border p-4 hover:shadow-md transition-shadow">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={a.image} 
                      alt={a.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-muted-foreground">{a.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Equipment</h2>
          <p className="text-lg text-muted-foreground">Professional equipment capabilities that deliver results</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { 
              icon: <Waves className="h-8 w-8 text-blue-600" />, 
              title: "True Amphibious", 
              desc: "Seamless land-water transitions reduce downtime.",
              image: "/images/New Images/Truxor_Cutting-Collecting_5_web.jpg"
            },
            { 
              icon: <Fuel className="h-8 w-8 text-green-600" />, 
              title: "Fuel Efficient", 
              desc: "Optimized hydraulics and power curve minimize burn.",
              image: "/images/New Images/Truxor_Cutting-Collecting_12_web.jpg"
            },
            { 
              icon: <Shield className="h-8 w-8 text-purple-600" />, 
              title: "Operator Safe", 
              desc: "ROPS-ready platform and excellent visibility.",
              image: "/images/New Images/Truxor_Cutting-Collecting_18_web.jpg"
            },
            { 
              icon: <Gauge className="h-8 w-8 text-orange-600" />, 
              title: "High Uptime", 
              desc: "Modular attachments and fast service access.",
              image: "/images/New Images/Truxor_Cutting-Collecting_22_web.jpg"
            },
          ].map((b, i) => (
            <Card key={b.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={b.image} 
                  alt={`${b.title} - ${b.desc}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4">
                  {b.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-lg font-semibold mb-2">{b.title}</div>
                <div className="text-sm text-muted-foreground">{b.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SPEC + COMPARISON */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Tabs defaultValue="specs">
          <TabsList>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="compare">Compare Models</TabsTrigger>
            <TabsTrigger value="transport">Transport & Footprint</TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="mt-6">
            <SpecGrid units={units} />
          </TabsContent>
          <TabsContent value="compare" className="mt-6">
            <Comparison />
          </TabsContent>
          <TabsContent value="transport" className="mt-6">
            <Transport />
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

          <Card>
            <CardHeader>
              <CardTitle>Request a tailored quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@contractingco.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="use">Primary use case</Label>
                  <Input id="use" placeholder="e.g., reed cutting, dredging, spill response" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Operating region</Label>
                  <Input id="location" placeholder="City, State / Country" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Project scope, timelines, constraints" />
                </div>
                <Button className="justify-self-start">Send request</Button>
                <p className="text-xs text-muted-foreground">By submitting, you agree to our privacy policy.</p>
              </form>
            </CardContent>
          </Card>
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
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">Real feedback from satisfied customers across Utah</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              quote: "Their professional equipment is incredible! They completely transformed our overgrown pond in just one day. The water is crystal clear now and our fish are thriving.", 
              author: "Sarah Johnson",
              location: "Park City, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_15_web.jpg"
            },
            { 
              quote: "Professional service from start to finish. Their expertise with aquatic vegetation control saved our lake from invasive species. Their equipment is the real deal!", 
              author: "Mike Thompson",
              location: "Provo, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_20_web.jpg"
            },
            { 
              quote: "Outstanding results! Our pond was completely overrun with weeds and algae. The team came in with their professional equipment and restored it to pristine condition.", 
              author: "Lisa Chen",
              location: "Salt Lake City, UT",
              image: "/images/New Images/Truxor_Cutting-Collecting_25_web.jpg"
            },
          ].map((t, i) => (
            <Card key={i} className="overflow-hidden">
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
          <h2 className="text-3xl font-bold mb-4">Equipment Gallery</h2>
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
            <div key={i} className="relative group overflow-hidden rounded-lg">
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
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ResourceItem title="Operator handbook" href="#" />
              <ResourceItem title="Hydraulic schematics" href="#" />
              <ResourceItem title="Attachment compatibility chart" href="#" />
              <ResourceItem title="Environmental compliance guide" href="#" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
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

      {/* FOOTER */}
      <footer className="border-t py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-4">
          <div>
            <div className="text-xl font-semibold">{BRAND.name}</div>
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
              <Button>Join</Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function SpecGrid({ units }: { units: "metric" | "imperial" }) {
  const rows = [
    { k: "Engine", v: SPEC.engine },
    { k: "Payload", v: SPEC.payload },
    { k: "Speed", v: SPEC.speed },
    { k: "Emissions", v: SPEC.emissions },
    { k: "Operating draft", v: SPEC.draft },
    { k: "Transport width", v: SPEC.width },
    { k: "Operating weight", v: SPEC.weight },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {rows.map(r => (
        <div key={r.k} className="flex items-center justify-between rounded-xl border p-4">
          <span className="text-sm text-muted-foreground">{r.k}</span>
          <span className="font-medium">{convert(r.k, r.v, units)}</span>
        </div>
      ))}
    </div>
  );
}

function convert(key: string, val: string, units: "metric" | "imperial") {
  // Super lightweight example; extend with a robust converter as needed
  if (units === "metric") return val;
  try {
    if (/\bkg\b/.test(val)) {
      const n = parseFloat(val.replace(/[^0-9.]/g, ""));
      return `${Math.round(n * 2.20462)} lb`;
    }
    if (/\bm\b/.test(val)) {
      const n = parseFloat(val.replace(/[^0-9.]/g, ""));
      return `${(n * 3.28084).toFixed(2)} ft`;
    }
    if (/\bkm\/h\b/.test(val)) {
      const n = parseFloat(val.replace(/[^0-9.]/g, ""));
      return `${(n * 0.621371).toFixed(1)} mph`;
    }
  } catch {}
  return val;
}

function Comparison() {
  const data = [
    { model: "T40", power: 40, width: 1.9, payload: 380 },
    { model: "T50", power: 50, width: 2.05, payload: 500 },
    { model: "T60", power: 60, width: 2.1, payload: 600 },
  ];
  return (
    <div className="grid gap-3">
      {data.map(row => (
        <div key={row.model} className="grid grid-cols-4 items-center gap-3 rounded-xl border p-4 text-sm">
          <div className="font-semibold">{row.model}</div>
          <div>{row.power} hp</div>
          <div>{row.width} m</div>
          <div>{row.payload} kg</div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Specs are illustrative; replace with verified figures.</p>
    </div>
  );
}

function Transport() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Footprint & clearances</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <InfoLine icon={<Ruler className="h-4 w-4" />} label="Width" value={SPEC.width} />
          <InfoLine icon={<ShipWheel className="h-4 w-4" />} label="Turning radius" value="Pivot steer (on spot)" />
          <InfoLine icon={<Waves className="h-4 w-4" />} label="Shore gradient" value="Up to 30% (surface dependent)" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Logistics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <InfoLine icon={<Shield className="h-4 w-4" />} label="Compliance" value="CE / Stage V / ROPS-ready" />
          <InfoLine icon={<Wrench className="h-4 w-4" />} label="Service" value="Fast-access panels, modular hydraulics" />
          <InfoLine icon={<Hand className="h-4 w-4" />} label="Crew" value="Single operator with optional spotter" />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <div className="flex items-center gap-2">
        {icon}<span className="text-muted-foreground">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ResourceItem({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50">
      <span>{title}</span>
      <Button variant="secondary" size="sm">Open</Button>
    </a>
  );
}

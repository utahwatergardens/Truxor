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

const SITUATIONS = [
  { icon: <Waves className="h-5 w-5" />, title: "Overgrown Ponds", desc: "Restore ponds overrun with weeds and vegetation." },
  { icon: <Fuel className="h-5 w-5" />, title: "Sediment Buildup", desc: "Remove years of accumulated muck and debris." },
  { icon: <Shield className="h-5 w-5" />, title: "Flood Damage", desc: "Emergency cleanup after storms and flooding." },
  { icon: <Gauge className="h-5 w-5" />, title: "Shoreline Erosion", desc: "Restore damaged or eroded shorelines." },
];

const FAQ = [
  { q: "How much does pond cleanup cost?", a: "Pond cleanup costs vary based on size, condition, and specific services needed. We offer free consultations and quotes. Typical projects range from $500-$5,000 depending on pond size and complexity." },
  { q: "What types of jobs do you handle?", a: "We handle excavation, vegetation removal, shoreline restoration, emergency response, and preventive maintenance. From small residential ponds to large commercial lakes, we have the equipment and expertise." },
  { q: "Do you offer maintenance plans?", a: "Yes! We offer seasonal maintenance plans to keep your pond healthy year-round. This includes regular inspections, vegetation control, and water quality monitoring to prevent future problems." },
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

      {/* STICKY SERVICES BAR */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <ServiceItem label="Excavation" value={SERVICES.excavation} />
            <ServiceItem label="Vegetation" value={SERVICES.vegetation} />
            <ServiceItem label="Shoreline" value={SERVICES.shoreline} />
            <ServiceItem label="Emergency" value={SERVICES.emergency} />
            <div className="ml-auto">
              <Button size="sm" variant="outline">Get Quote</Button>
            </div>
          </div>
        </div>
      </div>

      {/* JOB TYPES & CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Our Equipment in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelViewer />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Jobs We Handle</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {JOB_TYPES.map((job) => (
                <div key={job.name} className="flex gap-3 rounded-xl border p-4 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    {job.icon}
                  </div>
                  <div>
                    <div className="font-medium">{job.name}</div>
                    <div className="text-sm text-muted-foreground">{job.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
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
            <Card key={situation.title} className="overflow-hidden hover:shadow-lg transition-shadow">
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

          <Card>
            <CardHeader>
              <CardTitle>Get Your Free Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <Input id="service" placeholder="e.g., pond cleanup, vegetation removal, emergency response" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Utah" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Project Details</Label>
                  <Textarea id="notes" placeholder="Describe your pond/lake situation and any specific concerns" />
                </div>
                <Button className="justify-self-start">Get Free Quote</Button>
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
    { name: "Excavation & Dredging", desc: "Remove sediment, muck, and debris from ponds and lakes" },
    { name: "Vegetation Control", desc: "Clear invasive weeds, reeds, and overgrown vegetation" },
    { name: "Shoreline Restoration", desc: "Clean and restore eroded or overgrown shorelines" },
    { name: "Emergency Response", desc: "Rapid response for flooding, debris removal, and urgent situations" },
    { name: "Preventive Maintenance", desc: "Regular maintenance programs to keep water features healthy" },
    { name: "Habitat Restoration", desc: "Restore natural habitats for fish and wildlife" },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {services.map(service => (
        <div key={service.name} className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <span className="font-medium">{service.name}</span>
            <p className="text-sm text-muted-foreground">{service.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}



function ServiceAreas() {
  const areas = [
    { area: "Salt Lake City", services: "Full range of pond and lake services" },
    { area: "Park City", services: "Mountain property water feature maintenance" },
    { area: "Provo", services: "Residential and commercial pond cleanup" },
    { area: "Ogden", services: "Industrial and recreational water management" },
    { area: "St. George", services: "Desert landscape water feature restoration" },
    { area: "Statewide", services: "Emergency response and large-scale projects" },
  ];
  return (
    <div className="grid gap-3">
      {areas.map(area => (
        <div key={area.area} className="grid grid-cols-2 items-center gap-3 rounded-xl border p-4 text-sm">
          <div className="font-semibold">{area.area}</div>
          <div className="text-muted-foreground">{area.services}</div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Serving all of Utah with professional pond and lake cleanup services.</p>
    </div>
  );
}

function OurProcess() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Our Process</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <InfoLine icon={<Ruler className="h-4 w-4" />} label="1. Assessment" value="Site evaluation and project planning" />
          <InfoLine icon={<ShipWheel className="h-4 w-4" />} label="2. Proposal" value="Detailed quote and timeline" />
          <InfoLine icon={<Waves className="h-4 w-4" />} label="3. Execution" value="Professional equipment deployment" />
          <InfoLine icon={<Shield className="h-4 w-4" />} label="4. Completion" value="Quality check and follow-up" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Why Choose Us</CardTitle>
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

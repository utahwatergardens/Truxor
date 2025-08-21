import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES_DATA } from '../cities-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });
const ResourcesSection = dynamic(() => import('./ResourcesSection'), { ssr: false });

interface CityPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CITIES_DATA.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  
  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Pond Cleanup Services in ${city.name}, ${city.state}`,
    description: `Professional pond cleanup and lake maintenance services in ${city.name}, ${city.state}.`,
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.slug);
  
  if (!city) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">
          Pond Cleanup Services in {city.name}, {city.state}
        </h1>
        <p className="text-lg mb-4">{city.description}</p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Services in {city.name}</h2>
          <ul className="list-disc list-inside">
            {city.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p><strong>Population:</strong> {city.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {city.region}</p>
        </div>

        {/* Resources Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Resources & Technical Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <ResourcesSection />

            <Card className="hover-lift shadow-glow">
              <CardHeader>
                <CardTitle className="gradient-text">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-muted-foreground">+1-801-555-0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">Service Area</div>
                    <div className="text-sm text-muted-foreground">{city.name}, {city.state}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <div className="text-sm text-muted-foreground">2-4 hours during business hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}

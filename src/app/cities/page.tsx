import { Metadata } from 'next';
import Link from 'next/link';
import { CITIES_DATA, getCitiesByState } from './cities-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Search, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pond Cleanup Services by City | Utah, Idaho, Wyoming, Arizona',
  description: 'Find professional pond cleanup and lake maintenance services in your city. Serving 50+ cities across Utah, Idaho, Wyoming, and Arizona with specialized amphibious equipment.',
  keywords: 'pond cleanup by city, lake maintenance services, Utah pond services, Idaho lake cleanup, Wyoming water management, Arizona pond maintenance',
};

export default function CitiesPage() {
  const utahCities = getCitiesByState('Utah');
  const idahoCities = getCitiesByState('Idaho');
  const wyomingCities = getCitiesByState('Wyoming');
  const arizonaCities = getCitiesByState('Arizona');

  const getStateColor = (state: string) => {
    switch (state) {
      case 'Utah': return 'text-blue-600';
      case 'Idaho': return 'text-green-600';
      case 'Wyoming': return 'text-red-600';
      case 'Arizona': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getRegionColor = (region: string) => {
    if (region.includes('Front') || region.includes('Valley')) return 'bg-blue-100 text-blue-800';
    if (region.includes('Eastern') || region.includes('Central')) return 'bg-green-100 text-green-800';
    if (region.includes('North') || region.includes('South')) return 'bg-purple-100 text-purple-800';
    if (region.includes('Desert') || region.includes('Sun')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/New Images/Truxor_Cutting-Collecting_1_web.jpg"
            alt="Professional pond cleanup services across multiple states"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 py-28 text-white">
          <Badge className="w-fit glass-effect shadow-glow shimmer">Multi-State Service</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl gradient-text">
            Pond Cleanup Services by City
          </h1>
          <p className="max-w-2xl text-lg/7 md:text-xl/8">
            Professional pond and lake maintenance services across 50+ cities in Utah, Idaho, Wyoming, and Arizona. 
            Find services in your area with our specialized amphibious equipment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="lg" className="gradient-bg hover-lift shadow-glow" asChild>
              <a href="#contact-form">Get Free Quote</a>
            </Button>
            <Button variant="secondary" size="lg" className="glass-effect hover-lift" asChild>
              <a href="tel:+18015550123">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Service Coverage</h2>
          <p className="text-lg text-muted-foreground">
            We provide professional pond cleanup and lake maintenance services across the Intermountain West
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="hover-lift shadow-glow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{utahCities.length}</div>
              <div className="font-semibold mb-1">Utah Cities</div>
              <div className="text-sm text-muted-foreground">Wasatch Front & Beyond</div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-glow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{idahoCities.length}</div>
              <div className="font-semibold mb-1">Idaho Cities</div>
              <div className="text-sm text-muted-foreground">Treasure Valley & More</div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-glow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{wyomingCities.length}</div>
              <div className="font-semibold mb-1">Wyoming Cities</div>
              <div className="text-sm text-muted-foreground">Cowboy State Service</div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-glow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{arizonaCities.length}</div>
              <div className="font-semibold mb-1">Arizona Cities</div>
              <div className="text-sm text-muted-foreground">Valley of the Sun</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cities by State */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Tabs defaultValue="utah" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="utah">Utah ({utahCities.length})</TabsTrigger>
            <TabsTrigger value="idaho">Idaho ({idahoCities.length})</TabsTrigger>
            <TabsTrigger value="wyoming">Wyoming ({wyomingCities.length})</TabsTrigger>
            <TabsTrigger value="arizona">Arizona ({arizonaCities.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="utah" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {utahCities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`}>
                  <Card className="hover-lift shadow-glow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-1">{city.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{city.region}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Users className="h-3 w-3" />
                        {city.population.toLocaleString()}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getRegionColor(city.region)}`}>
                        {city.region}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="idaho" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {idahoCities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`}>
                  <Card className="hover-lift shadow-glow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-1">{city.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{city.region}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Users className="h-3 w-3" />
                        {city.population.toLocaleString()}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getRegionColor(city.region)}`}>
                        {city.region}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="wyoming" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {wyomingCities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`}>
                  <Card className="hover-lift shadow-glow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-1">{city.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{city.region}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Users className="h-3 w-3" />
                        {city.population.toLocaleString()}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getRegionColor(city.region)}`}>
                        {city.region}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="arizona" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {arizonaCities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`}>
                  <Card className="hover-lift shadow-glow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-1">{city.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{city.region}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Users className="h-3 w-3" />
                        {city.population.toLocaleString()}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getRegionColor(city.region)}`}>
                        {city.region}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Service Areas Summary */}
      <section className="mx-auto max-w-7xl px-6 py-16 water-gradient">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Regional Expertise</h2>
          <p className="text-lg text-muted-foreground">
            Our specialized amphibious equipment and local knowledge serve diverse environments across the Intermountain West
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift shadow-glow bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Utah</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Mountain lakes, desert water features, and agricultural irrigation systems across the Wasatch Front and beyond.
              </p>
              <div className="text-sm font-semibold text-blue-600">{utahCities.length} Cities Served</div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-glow bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold">Idaho</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                River systems, agricultural ponds, and recreational lakes throughout the Treasure Valley and Eastern Idaho.
              </p>
              <div className="text-sm font-semibold text-green-600">{idahoCities.length} Cities Served</div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-glow bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-red-600" />
                <h3 className="text-xl font-semibold">Wyoming</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Ranch ponds, industrial water management, and recreational lakes across the Cowboy State.
              </p>
              <div className="text-sm font-semibold text-red-600">{wyomingCities.length} Cities Served</div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-glow bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-semibold">Arizona</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Desert landscape ponds, golf course maintenance, and resort water features in the Valley of the Sun.
              </p>
              <div className="text-sm font-semibold text-orange-600">{arizonaCities.length} Cities Served</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Don't See Your City?</h2>
          <p className="text-lg text-muted-foreground">
            We're always expanding our service areas. Contact us to discuss your specific water management needs.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4 gradient-text">Get Professional Pond Services</h3>
          <p className="text-muted-foreground mb-6">
            Our specialized amphibious equipment can handle unique challenges that other services can't reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="gradient-bg hover-lift shadow-glow">
              <Phone className="mr-2 h-4 w-4" />
              Call for Service
            </Button>
            <Button variant="outline" className="hover-lift">
              <MapPin className="mr-2 h-4 w-4" />
              Request Coverage
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

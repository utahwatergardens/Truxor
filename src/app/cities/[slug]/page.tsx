import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES_DATA } from '../cities-data';

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
    </div>
  );
}

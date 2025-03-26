import { getContent } from '@/utils/server-content';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate every hour

export default async function About() {
  const content = await getContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={content.about.heroImage}
          alt={content.about.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.about.title}</h1>
            <p className="text-xl md:text-2xl">{content.about.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">{content.about.mainContent.title}</h2>
            <div className="prose max-w-none">
              <p className="mb-6">{content.about.mainContent.description}</p>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Our History</h3>
                <p>{content.about.mainContent.history}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p>{content.about.mainContent.mission}</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.about.team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-600 mb-2">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.about.values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
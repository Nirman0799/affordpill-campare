// src/components/home/categories-section.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Cate() {
  const categories = [
    {
      id: '1',
      name: 'Hair Care',
      slug: 'hair-care',
      imageUrl: '/images/categories/hair-care.png',
    },
    {
      id: '2',
      name: 'Oral Care',
      slug: 'oral-care',
      imageUrl: '/images/categories/oral-care.png',
    },
    {
      id: '3',
      name: 'Sexual Wellness',
      slug: 'sexual-wellness',
      imageUrl: '/images/categories/sexual-wellness.png',
    },
    {
      id: '4',
      name: 'Skin Care',
      slug: 'skin-care',
      imageUrl: '/images/categories/skin-care.png',
    },
    {
      id: '5',
      name: 'Women Care',
      slug: 'womens-care',
      imageUrl: '/images/categories/women-care.png',
    },
    {
      id: '6',
      name: 'Baby Care',
      slug: 'baby-care',
      imageUrl: '/images/categories/baby.png',
    },
    {
      id: '7',
      name: 'Elderly Care',
      slug: 'calcium-supliment',
      imageUrl: '/images/categories/elderly.png',
    },
    {
      id: '8',
      name: 'Men Grooming',
      slug: 'mens-care',
      imageUrl: '/images/categories/grooming.png',
    },
    {
      id: '9',
      name: 'Vitamins & Nutrition',
      slug: 'multivitamins',
      imageUrl: '/images/categories/multivitamins.png',
    },
    {
      id: '10',
      name: 'Fitness Supplements',
      slug: 'fitness-supplements',
      imageUrl: '/images/categories/gym.png',
    },
    {
      id: '11',
      name: 'Nutritional Drinks',
      slug: 'health-supplement',
      imageUrl: '/images/categories/ndrinks.png',
    },
    {
      id: '12',
      name: 'Anti Septic',
      slug: 'antiseptics',
      imageUrl: '/images/categories/antiseptic.png',
    },
    {
      id: '13',
      name: 'Gastro',
      slug: 'gastro-health',
      imageUrl: '/images/categories/gastro.png',
    },
    {
      id: '14',
      name: 'Monitoring Devices',
      slug: 'blood-glucose-monitors',
      imageUrl: '/images/categories/monitoring.png',
    },
    {
      id: '15',
      name: 'Rehydration Beverages',
      slug: 'rehydration',
      imageUrl: '/images/categories/rehydration.png',
    },
    {
      id: '16',
      name: 'Immunity Boosters',
      slug: 'immunity-support',
      imageUrl: '/images/categories/immunity.png',
    },
    {
      id: '17',
      name: 'Stomach Care',
      slug: 'laxative-and-antacid',
      imageUrl: '/images/categories/stomach.png',
    },
    {
      id: '18',
      name: 'Cold, Cough & Fever',
      slug: 'coughs',
      imageUrl: '/images/categories/cough.png',
    },
    {
      id: '19',
      name: 'Pain Relief',
      slug: 'pain-relief',
      imageUrl: '/images/categories/pain-relief.png',
    },
    {
      id: '20',
      name: 'Cosmetics',
      slug: 'cosmetics',
      imageUrl: '/images/categories/cosmetics.png',
    },
  ];

  const mobileView = categories.slice(0, 8); // 8 categories for mobile

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
        
        {/* scrollable rows */}
        <div className="md:hidden">
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#F1EFFF] transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="25vw"
                    className="object-contain p-3"
                  />
                </div>
                <span className="mt-1 text-center font-medium text-xs leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* desktop - full grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#FFF5F5] transition-all duration-300 hover:shadow-md group-hover:scale-105">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1200px) 20vw, 17vw"
                    className="object-contain p-4"
                  />
                </div>
                <span className="mt-2 text-center font-medium text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
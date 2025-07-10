// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import AntibioticsBanner from '@/components/home/antibiotics-banner';
import MultivitaminBanner from '@/components/home/multivitamin-banner';
import PrescriptionUploadBanner from '@/components/home/prescription-upload-banner';
import TestimonialsSection from '@/components/home/testimonials-section';
import CategoryProductSection from '@/components/home/category-product-section';
import SkincareBanner from '@/components/home/skincare-banner';
import Cate from '@/components/home/cate';
import MeglowBanner from "@/components/meglow-banner";
import NbProgrowProductShowcase from '@/components/nb-progrow-product-showcase';
import GlucoOneProductCard from '@/components/gluco-one-product-card';
import ProductCarousel from "@/components/home/product-carousel";
import CardiacCareProducts from "@/components/home/cardiac-care-products";
import NirmanBioPharmaProducts from "@/components/home/marketer-products";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AffordPill - Save on Medications',
  description: 'AffordPill is an online pharmacy offering reliable delivery of affordable medicines right to your doorstep.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Cate/>
      <GlucoOneProductCard />
      <MeglowBanner />
      <PrescriptionUploadBanner />
      <NbProgrowProductShowcase />
      <AntibioticsBanner />
      <ProductCarousel />
      <MultivitaminBanner />
      <NirmanBioPharmaProducts />
      <CardiacCareProducts />
      <CategoryProductSection />
      <SkincareBanner />
      <TestimonialsSection />
    </main>
  );
}
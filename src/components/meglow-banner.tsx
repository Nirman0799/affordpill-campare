import Image from "next/image"
import Link from "next/link"

export default function MeglowBanner() {
  const imageHeight = 533
  const imageWidth = 900

  return (
    <div className="container mx-auto px-4">
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <Link href="/products/meglow-woman-cream-30gm" className="block w-full sm:w-[49%]">
          <Image
            src="/banners/one.png"
            alt="Meglow by Leeford - Fairness Cream for Women"
            width={imageWidth}
            height={imageHeight}
            className="w-full h-auto object-cover rounded-lg"
            priority
          />
        </Link>
        <Link href="/products/meglow-man-cream-30gm" className="block w-full sm:w-[49%]">
          <Image
            src="/banners/two.png"
            alt="Meglow by Leeford - Fairness Cream for Men"
            width={imageWidth}
            height={imageHeight}
            className="w-full h-auto object-cover rounded-lg"
            priority
          />
        </Link>
      </div>
    </div>
  )
}


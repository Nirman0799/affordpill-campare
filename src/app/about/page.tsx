import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OurStoryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Story</h1>
        <p className="text-xl text-muted-foreground mx-auto">
          Making quality healthcare accessible to every Indian household
        </p>
      </div>

      <div className="mb-12">
        <p className="text-lg leading-relaxed">
          Welcome to Affordpill, where we are committed to making quality healthcare accessible and affordable for
          everyone. Founded by a team of seasoned healthcare professionals, Affordpill is more than just an online
          pharmacy—it's a vision brought to life by years of industry experience, passion, and dedication to improving
          lives.
        </p>
      </div>
      <div className="bg-teal-50 rounded-2xl p-6 mb-12">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-teal-800 mb-3">Our Mission</h2>
          <p className="text-lg text-teal-700 italic">
            "To make quality medicines affordable and accessible to every household in India, ensuring that no one has
            to choose between their health and their financial well-being."
          </p>
        </div>
      </div>
      <div className="grid gap-10 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">The Birth of Affordpill</h2>
          <p className="text-lg">
            In a country where healthcare costs can often push families into financial distress, we at Nirman Bio Pharma
            Limited (NBPL) saw an opportunity to make a difference. For years, we witnessed how branded medications,
            despite their effectiveness, remained out of reach for millions of Indians due to their high prices.
          </p>
          <p className="text-lg">
            This realization sparked a vision: what if we could provide the same quality medicines at a fraction of the
            cost? What if no parent had to choose between buying medicine for their child and putting food on the table?
            What if every elderly person could afford their monthly prescriptions without depleting their savings?
          </p>
          <p className="text-lg">
            And so, Affordpill was born – not just as a business, but as a mission to transform healthcare accessibility
            in India.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Breaking the Cost Barrier</h2>
          <p className="text-lg">
            At Affordpill, we believe that quality healthcare is a right, not a privilege. By focusing on generic
            substitutes of branded medicines, we've been able to significantly reduce costs without compromising on
            quality or effectiveness.
          </p>
          <p className="text-lg">
            Every medicine on our platform undergoes rigorous quality checks to ensure it meets the highest standards.
            We work directly with reputable manufacturers, cutting out middlemen and passing the savings directly to you
            – the people who matter most.
          </p>
          <p className="text-lg">
            Our commitment goes beyond just providing affordable medicines. We're building a healthcare ecosystem that
            educates, supports, and empowers every Indian to take control of their health journey.
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">The Visionaries Behind Affordpill</h2>
        <p className="text-lg text-center mb-8">
          Our leadership team comprises industry experts with a combined experience of over 30 years in the healthcare
          sector:
        </p>
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-xl font-bold mb-1">Sunil Kumar</h3>
              <p className="text-muted-foreground mb-1">CEO / Director</p>
              <Separator className="my-3" />
              <p className="text-base">
                A visionary leader with a B.Tech from BITS Pilani, Sunil brings over 15 years of rich experience in the
                healthcare industry. He is the founder of Nirman Bio Pharma and has successfully managed a chain of 40
                medical retail counters, showcasing his deep understanding of the healthcare ecosystem. His strategic
                insights and entrepreneurial spirit are the driving forces behind Affordpill.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-xl font-bold mb-1">Anuradha Kumari</h3>
              <p className="text-muted-foreground mb-1">Director</p>
              <Separator className="my-3" />
              <p className="text-base">
                With a strong academic background in M.Sc, Anuradha has over 10 years of hands-on experience in the
                healthcare industry. She has been a key partner with Sunil Kumar in Nirman Bio Pharma and the retail
                chain, contributing her expertise in operations, business development, and customer engagement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-xl font-bold mb-1">Ashish Jha</h3>
              <p className="text-muted-foreground mb-1">General Manager</p>
              <Separator className="my-3" />
              <p className="text-base">
                A B.Pharm graduate, Ashish brings over 7 years of valuable experience working with reputed healthcare
                brands. His background in pharmaceutical operations, supply chain management, and strategic partnerships
                adds a dynamic edge to Affordpill's growth journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Our Impact</h2>
          <p className="text-lg">
            Since our inception, we've helped thousands of families save on their medical expenses without compromising
            on quality. We've seen elderly patients who can now afford their full course of treatment, parents who no
            longer have to choose between their children's education and their health, and individuals who can finally
            adhere to their prescribed medications without financial strain.
          </p>
          <p className="text-lg">
            Every time a customer chooses Affordpill, they're not just saving money – they're joining a movement to make
            healthcare accessible to all. And for us, each order is not just a transaction, but a step towards
            fulfilling our promise of affordable healthcare for every Indian household.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us in Our Mission</h2>
        <p className="text-lg mb-6 mx-auto">
          At Affordpill, we're more than just an online pharmacy – we're a community committed to transforming
          healthcare accessibility in India. We invite you to be a part of this journey towards a healthier, more
          equitable India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Explore Our Products</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


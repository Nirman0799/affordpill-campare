"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin, Clock, Shield, CreditCard, Truck, ExternalLink } from "lucide-react"

export default function Footer() {
  const router = useRouter()
  const currentYear = new Date().getFullYear()

  const openCrispChat = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"])
    }
  }

  const footerLinks = [
    {
      title: "Shop by Category",
      links: [
        { name: "Health Supplements", href: "/categories/health-supplement" },
        { name: "Pain Relief", href: "/categories/pain-relief" },
        { name: "Immunity Support", href: "/categories/immunity-support" },
        { name: "Sexual Wellness", href: "/categories/sexual-wellness" },
        { name: "Stomach care", href: "/categories/laxative-and-antacid" },
        { name: "Hair care", href: "/categories/hair-care" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Upload Prescription", href: "/upload" },
        { name: "Find a Store", href: "/stores" },
        { name: "Order Medicines", href: "/products" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", href: "/login/" },
        { name: "Track Order", href: "/account/orders" },
        { name: "Return & Refund Policy", href: "/return-refund-policy" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Terms & Conditions", href: "/tos" },
        { name: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-50 pt-16">
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logo and Social Media */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <Image
                src="/logo.png?height=60&width=200&text=AffordPill+Logo"
                alt="AffordPill Logo"
                width={200}
                height={60}
                className="object-contain"
              />
              <p className="text-gray-600 mt-3">Your trusted online pharmacy for affordable medications</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center transition-colors"
              >
                Facebook <ExternalLink className="h-3 w-3 ml-1.5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center transition-colors"
              >
                Twitter <ExternalLink className="h-3 w-3 ml-1.5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center transition-colors"
              >
                Instagram <ExternalLink className="h-3 w-3 ml-1.5" />
              </Link>
              
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-2">We Accept</p>
              <Image
                src="/payments.png?height=40&width=280&text=Payment+Methods"
                alt="Payment Methods"
                width={280}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer Support</p>
                  <p className="text-gray-600">01204094276 / 9818310317</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Us</p>
                  <p className="text-gray-600">support@affordpill.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
      <MapPin className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <p className="text-sm font-medium text-gray-900">Address</p>
        <p className="text-gray-600">Plot. No. D-67, Sector-6, Noida, Uttar Pradesh-201301</p>
      </div>
    </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Working Hours</p>
                  <p className="text-gray-600">Mon-Sat: 9AM-9PM, Sun: 10AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Why Choose AffordPill</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">100% Genuine Products</h4>
              <p className="text-sm text-gray-600">All products are sourced directly from manufacturers</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Delivery within 24-48 hours in major cities</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Secure Payments</h4>
              <p className="text-sm text-gray-600">Multiple secure payment options available</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">32 Physical Stores</h4>
              <p className="text-sm text-gray-600">Visit our stores in Delhi, Gurgaon, and Noida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-emerald-500 text-white py-3">
        <div className="container mx-auto px-4 text-center text-sm">
          All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics
          Rules, 1945. We do not process requests for Schedule X and habit forming drugs.
        </div>
      </div>

      <div className="bg-gradient-to-r from-black via-black-900 to-black text-white py-8 w-full">
        <div className="max-w-full mx-auto px-[5px] md:px-[10px]">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-white/80">A product by NirmanBioPharma</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center mt-4 md:mt-0">
                <a href="#" onClick={openCrispChat} className="text-white hover:underline">
  Chat with us
</a>
              </div>
            </div>

<div className="flex justify-center py-8 overflow-hidden w-full px-4">
      <h2 className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700 backdrop-blur-sm">
        affordpill.com
      </h2>
    </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-white/80">© {currentYear} - affordpill.com | All rights reserved</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center mt-4 md:mt-0">
                <Link href="/tos" className="text-white hover:underline">
                  Terms and Conditions
                </Link>
                <span className="hidden md:inline text-white">•</span>
                <Link href="/privacy-policy" className="text-white hover:underline">
                  Privacy Policy
                </Link>
                <span className="hidden md:inline text-white">•</span>
                <Link href="/return-refund-policy" className="text-white hover:underline">
                  Return and Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


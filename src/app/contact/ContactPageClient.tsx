"use client"

import { Mail, Phone, MapPin, MessageSquare, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPageClient() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">For general inquiries, orders, or feedback</p>
                  <a href="mailto:support@affordpill.com" className="mt-2 inline-block text-primary hover:underline">
                    support@affordpill.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Speak directly with our customer support team</p>
                  <a href="tel:+919266576156" className="mt-2 inline-block text-primary hover:underline">
                    +91 9266576156
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Registered Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Our official business address</p>
                  <address className="mt-2 not-italic">
                    <strong>AFFORD PILL.COM</strong>
                    <br />
                    Kh.No.119, FF, Gali No-3,
                    <br />
                    Chater Singh Complex, Village Chhalera,
                    <br />
                    Sector-37, Gautam Buddha Nagar
                    <br />
                    UTTAR PRADESH 201301
                    <br />
                    INDIA
                  </address>
                  <a
                    href="https://maps.google.com/?q=Sector-37+Gautam+Buddha+Nagar+UTTAR+PRADESH+201301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                  >
                    View on Google Maps
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Chat with our customer support team in real-time</p>
                  <p className="mt-2 text-sm">
                    Click the chat icon in the bottom right corner of any page to start a conversation with our team.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      // trigger chat widget
                      alert("Chat functionality opens here")
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">When you can reach our customer support team</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <strong>Monday to Friday:</strong> 9:00 AM - 8:00 PM IST
                    </p>
                    <p>
                      <strong>Saturday:</strong> 9:00 AM - 6:00 PM IST
                    </p>
                    <p>
                      <strong>Sunday:</strong> 10:00 AM - 4:00 PM IST
                    </p>
                    <p className="mt-2 text-muted-foreground">*Closed on major national holidays</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-lg bg-muted p-6 text-center">
          <h2 className="text-xl font-semibold">Need Urgent Assistance?</h2>
          <p className="mt-2 text-muted-foreground">
            For urgent medication-related queries or order issues, please call our customer support line directly.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild>
              <a href="tel:+919266576156">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:sunil@affordpill.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


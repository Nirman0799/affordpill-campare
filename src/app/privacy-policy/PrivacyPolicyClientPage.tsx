"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Clock,
  Cookie,
  CreditCard,
  Database,
  FileText,
  Globe,
  HardDrive,
  Info,
  Key,
  Lock,
  Mail,
  Server,
  Shield,
  ShieldAlert,
  User,
  UserCog,
  Users,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyClientPage() {
  const [activeTab, setActiveTab] = useState("collection")

  return (
    <div className="max-w-[1320px] mx-auto py-8 px-6 md:px-8 lg:px-10 md:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          AffordPill.com ("AffordPill," "we," "us," or "our") is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our website or use our mobile application.
        </p>
        <p className="text-sm text-muted-foreground">Last Updated: March 25, 2025</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>Privacy at a Glance</CardTitle>
          </div>
          <CardDescription>Key points about how we handle your data</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <Lock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Data Security</h3>
              <p className="text-sm text-muted-foreground">We use industry-standard encryption and security measures</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <UserCog className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Your Control</h3>
              <p className="text-sm text-muted-foreground">You have rights to access, correct, and delete your data</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Payment processing through Razorpay with PCI DSS compliance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="collection" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="collection" className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                <span>Data Collection</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-1">
                <HardDrive className="h-4 w-4" />
                <span>Data Usage</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="thirdparty" className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                <span>Third Parties</span>
              </TabsTrigger>
              <TabsTrigger value="cookies" className="flex items-center gap-1">
                <Cookie className="h-4 w-4" />
                <span>Cookies</span>
              </TabsTrigger>
              <TabsTrigger value="rights" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Your Rights</span>
              </TabsTrigger>
              <TabsTrigger value="international" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>International</span>
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Updates</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>

        <TabsContent value="collection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
              <CardDescription>Types of personal and non-personal information we gather</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Personal Information
                </h3>
                <p className="text-muted-foreground">
                  We may collect personal information that you voluntarily provide to us when you register on the
                  website, express interest in obtaining information about us or our products and services, participate
                  in activities on the website, or otherwise contact us.
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Account Information</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Full name</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <Mail className="h-3 w-3" />
                        </span>
                        <span>Email address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Phone number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Date of birth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Gender</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Delivery Information</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Shipping address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Billing address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>ZIP/Postal code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>City and state</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                          <User className="h-3 w-3" />
                        </span>
                        <span>Delivery preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Health Information
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Sensitive Health Data</h4>
                      <p className="text-amber-700 text-sm">
                        We collect health-related information only as necessary to fulfill your orders and provide our
                        services. This may include prescription details, medication history, and health conditions.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">Health information we may collect includes:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </span>
                    <span>Prescription details uploaded to our platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </span>
                    <span>Medication history and current medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </span>
                    <span>Allergies and adverse reactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </span>
                    <span>Health conditions relevant to your medication needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </span>
                    <span>Information shared during consultations with healthcare providers through our platform</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Payment Information
                </h3>
                <p className="text-muted-foreground">
                  We collect payment information when you make purchases through our platform. All payment processing is
                  handled by our trusted payment processor, Razorpay. We do not store complete credit card details on
                  our servers.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Payment Security</h4>
                      <p className="text-blue-700 text-sm">
                        Razorpay is PCI DSS compliant, ensuring that your payment information is processed according to
                        the highest security standards in the industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  Automatically Collected Information
                </h3>
                <p className="text-muted-foreground mb-2">
                  When you visit our website or use our mobile application, we automatically collect certain information
                  about your device and usage patterns. This includes:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Device Information</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Device type and model</li>
                      <li>Operating system and version</li>
                      <li>Browser type and version</li>
                      <li>Mobile device identifiers</li>
                      <li>IP address</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Usage Data</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Pages visited and time spent</li>
                      <li>Referring websites or sources</li>
                      <li>Click patterns and interactions</li>
                      <li>Search queries on our platform</li>
                      <li>App features used and frequency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Collect Information</CardTitle>
              <CardDescription>Methods used to gather your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Direct Collection
                </h3>
                <p className="text-muted-foreground">We collect information directly from you when you:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Register for an account on our website or mobile application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Place an order for medications or other products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Upload prescriptions to our platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Participate in surveys, promotions, or contests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Contact our customer service team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <User className="h-3 w-3" />
                    </span>
                    <span>Subscribe to our newsletters or marketing communications</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  Automated Collection
                </h3>
                <p className="text-muted-foreground">
                  We use various technologies to automatically collect information, including:
                </p>
                <div className="grid gap-3 md:grid-cols-3 mt-4">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Cookies</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Small data files stored on your device that help us improve your experience, see which areas are
                      popular, and count visits.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Log Files</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Track actions on our platform, collect IP addresses, browser types, Internet Service Providers,
                      referring/exit pages, and date/time stamps.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Web Beacons</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Small electronic files that help us understand how users engage with our emails and website.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Third-Party Sources
                </h3>
                <p className="text-muted-foreground">
                  We may receive information about you from other sources, including:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Users className="h-3 w-3" />
                    </span>
                    <span>Third-party pharmacies and healthcare providers with your consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Users className="h-3 w-3" />
                    </span>
                    <span>Business partners and affiliates who provide services on our behalf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Users className="h-3 w-3" />
                    </span>
                    <span>Social media platforms when you connect your account or share our content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Users className="h-3 w-3" />
                    </span>
                    <span>Publicly available sources to verify information or enhance our services</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
              <CardDescription>Purposes for which we process your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  Primary Purposes
                </h3>
                <p className="text-muted-foreground">
                  We use your personal information for the following primary purposes:
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <CreditCard className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Process Transactions</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To process your orders, payments, refunds, and deliveries of medications and other products.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <FileText className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Verify Prescriptions</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To verify the authenticity and validity of prescriptions uploaded to our platform.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Manage Accounts</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To create and manage your account, including authentication and maintaining your profile.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <Mail className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Communicate</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To communicate with you about your orders, account, and our services, including order
                      confirmations and updates.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  Additional Uses
                </h3>
                <p className="text-muted-foreground">
                  We may also use your information for the following additional purposes:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Improve Our Services</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        To analyze usage patterns, identify trends, and enhance the user experience on our platform.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Personalize Content</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        To tailor content, recommendations, and offers based on your preferences and past interactions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Marketing and Promotions</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        To send you marketing communications, newsletters, and promotional offers that may be of
                        interest to you, with your consent.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Research and Analytics</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        To conduct research and analysis to better understand our customers and improve our products and
                        services.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Legal Compliance</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        To comply with legal obligations, resolve disputes, and enforce our agreements.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Legal Basis for Processing
                </h3>
                <p className="text-muted-foreground mb-2">
                  We process your personal information based on one or more of the following legal grounds:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Contractual Necessity</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing is necessary to fulfill our contractual obligations to you, such as processing your
                      orders and delivering products.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Consent</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing based on your explicit consent, such as for marketing communications or processing
                      health data.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Legitimate Interests</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing necessary for our legitimate business interests, such as fraud prevention, security,
                      and improving our services.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Legal Obligation</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing necessary to comply with applicable laws, regulations, and government requests.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>How long we keep your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Retention Periods
                </h3>
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                  Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to
                  determine our retention periods include:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Clock className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Active Accounts</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We retain personal information for as long as you maintain an active account with us.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Clock className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Legal Requirements</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We retain prescription records and transaction data for a minimum of 2 years as required by
                        applicable pharmacy and healthcare regulations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Clock className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Business Needs</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We may retain certain information for legitimate business purposes, such as fraud prevention,
                        dispute resolution, and enforcing our terms.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Specific Retention Timeframes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border px-4 py-2 text-left">Data Category</th>
                        <th className="border px-4 py-2 text-left">Retention Period</th>
                        <th className="border px-4 py-2 text-left">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Account Information</td>
                        <td className="border px-4 py-2">Until account deletion + 30 days</td>
                        <td className="border px-4 py-2">Account management and recovery period</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Prescription Data</td>
                        <td className="border px-4 py-2">2-5 years</td>
                        <td className="border px-4 py-2">Legal requirements and healthcare continuity</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Transaction History</td>
                        <td className="border px-4 py-2">8 years</td>
                        <td className="border px-4 py-2">Tax and accounting requirements</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Communication Records</td>
                        <td className="border px-4 py-2">3 years</td>
                        <td className="border px-4 py-2">Customer service and dispute resolution</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Usage Data</td>
                        <td className="border px-4 py-2">2 years</td>
                        <td className="border px-4 py-2">Service improvement and analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Data Deletion
                </h3>
                <p className="text-muted-foreground">
                  When your data is no longer needed for the purposes for which it was collected, we will either delete
                  it or anonymize it so that it can no longer be associated with you. If complete deletion is not
                  possible due to legal, regulatory, or technical reasons, we will implement appropriate measures to
                  prevent any further processing of such data.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Account Deletion Request</h4>
                      <p className="text-blue-700 text-sm">
                        You can request deletion of your account and personal information at any time by contacting our
                        customer support team or using the account deletion option in your profile settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
              <CardDescription>How we protect your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Security Measures
                </h3>
                <p className="text-muted-foreground">
                  We implement a variety of security measures to maintain the safety of your personal information when
                  you place an order or enter, submit, or access your personal information. These include:
                </p>
                <div className="grid gap-3 md:grid-cols-3 mt-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <Lock className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Encryption</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All sensitive information transmitted to and from our platform is encrypted using
                      industry-standard SSL/TLS protocols.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <Key className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Access Controls</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strict access controls limit who can access your data, with regular audits of access privileges.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <Shield className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Firewalls</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Advanced firewalls and intrusion detection systems protect our infrastructure from unauthorized
                      access.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  Infrastructure Security
                </h3>
                <p className="text-muted-foreground">
                  Our platform is hosted on Vercel, a secure cloud infrastructure provider that maintains robust
                  security measures:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Server className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Physical Security</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Data centers with 24/7 monitoring, surveillance, and strict access controls.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Server className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Network Security</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        DDoS protection, regular security audits, and network monitoring.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Server className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Compliance</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our infrastructure complies with industry standards including ISO 27001, SOC 2, and GDPR
                        requirements.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  Database Security
                </h3>
                <p className="text-muted-foreground">
                  We use secure database providers with the following security features:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Database className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Encryption at Rest</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        All sensitive data is encrypted when stored in our databases.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Database className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Regular Backups</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Automated backups with encryption to prevent data loss.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Database className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Access Logging</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Comprehensive logging of all database access and modifications.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Payment Security
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">PCI DSS Compliance</h4>
                      <p className="text-green-700 text-sm">
                        Our payment processing partner, Razorpay, is PCI DSS (Payment Card Industry Data Security
                        Standard) compliant, ensuring that your payment information is handled according to the
                        strictest security standards.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">Key payment security features include:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <CreditCard className="h-3 w-3" />
                    </span>
                    <span>Tokenization of payment information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <CreditCard className="h-3 w-3" />
                    </span>
                    <span>End-to-end encryption of payment data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <CreditCard className="h-3 w-3" />
                    </span>
                    <span>Fraud detection and prevention systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <CreditCard className="h-3 w-3" />
                    </span>
                    <span>Regular security audits and penetration testing</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  Data Breach Procedures
                </h3>
                <p className="text-muted-foreground">
                  In the unlikely event of a data breach, we have comprehensive procedures in place:
                </p>
                <ol className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-medium">Immediate Investigation</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We will promptly investigate the breach and take steps to contain it.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-medium">Notification</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We will notify affected users and relevant authorities as required by law, typically within 72
                        hours of discovery.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-medium">Remediation</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We will take steps to address the cause of the breach and prevent similar incidents in the
                        future.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <span className="font-medium">Support</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We will provide guidance and support to affected users to help them protect their information.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thirdparty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Service Providers</CardTitle>
              <CardDescription>How we work with external partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  Infrastructure and Hosting
                </h3>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-black text-white">Vercel</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      We use Vercel for hosting our website and web application. Vercel processes user data to provide
                      hosting services, including:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>IP addresses and request logs</li>
                      <li>Performance metrics</li>
                      <li>Error tracking</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>Database Provider</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      We use secure database services to store and manage your data. Our database providers implement
                      robust security measures, including:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Encryption at rest and in transit</li>
                      <li>Regular security audits</li>
                      <li>Automated backups</li>
                      <li>Access controls and monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Payment Processing
                </h3>
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600">Razorpay</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    We use Razorpay to process payments on our platform. When you make a payment, you provide your
                    payment information directly to Razorpay, and we do not store your complete payment details on our
                    servers.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-2">
                    <h4 className="text-sm font-medium text-blue-800">Information shared with Razorpay:</h4>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4 mt-1">
                      <li>Transaction amount and currency</li>
                      <li>Order ID and description</li>
                      <li>Customer contact information for receipts and verification</li>
                      <li>Payment method information you provide directly to them</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Healthcare Partners
                </h3>
                <p className="text-muted-foreground">
                  We work with various healthcare partners to provide our services:
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">Third-Party Pharmacies</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      We share necessary information with partner pharmacies to fulfill your prescription orders:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Prescription details</li>
                      <li>Customer name and contact information</li>
                      <li>Delivery address</li>
                      <li>Order details</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">Healthcare Providers</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For online consultations, we share information with healthcare providers:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Medical history you provide</li>
                      <li>Symptoms and concerns</li>
                      <li>Previous prescription information</li>
                      <li>Contact details for follow-up</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  Analytics and Marketing
                </h3>
                <p className="text-muted-foreground">
                  We use various analytics and marketing tools to improve our services and reach customers:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Analytics Providers</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We use analytics tools to understand how users interact with our platform, track performance,
                        and improve user experience. These tools collect information such as pages visited, time spent,
                        referring websites, and device information.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Email Marketing Services</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We use email marketing services to send newsletters, promotional offers, and transactional
                        emails. These services receive your email address, name, and information about your interactions
                        with our emails.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Customer Support Tools</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We use customer support platforms to manage inquiries and provide assistance. These tools
                        process communication records, contact information, and details about your support requests.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Third-Party Data Protection
                </h3>
                <p className="text-muted-foreground">
                  We take steps to ensure that our third-party service providers maintain appropriate security measures:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <span>We conduct due diligence before engaging with third-party service providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <span>
                      We enter into data processing agreements that include confidentiality and security obligations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <span>We regularly review the security practices of our key service providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <span>We limit data sharing to what is necessary for the provision of services</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
              <CardDescription>How we use cookies and similar technologies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  What Are Cookies
                </h3>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely
                  used to make websites work more efficiently and provide information to the website owners.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">How Cookies Work</h4>
                      <p className="text-blue-700 text-sm">
                        When you visit our website, we may send cookies to your browser, which are then stored on your
                        device. These cookies can be read by our website on subsequent visits to recognize you and
                        remember your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  Types of Cookies We Use
                </h3>
                <p className="text-muted-foreground mb-2">We use different types of cookies for various purposes:</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Essential Cookies</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable basic functions like
                      page navigation, secure areas access, and shopping cart functionality.
                    </p>
                    <Badge className="mt-2 bg-red-100 text-red-800 hover:bg-red-100">Cannot be disabled</Badge>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Preference Cookies</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      These cookies remember your preferences and settings to enhance your experience on our website,
                      such as language preferences and theme settings.
                    </p>
                    <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Optional</Badge>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Analytics Cookies</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by collecting and
                      reporting information anonymously. They help us improve our website and services.
                    </p>
                    <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Optional</Badge>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Marketing Cookies</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      These cookies track your browsing habits to deliver advertising more relevant to you and your
                      interests. They also limit the number of times you see an ad and help measure the effectiveness of
                      advertising campaigns.
                    </p>
                    <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Optional</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  Cookie Duration
                </h3>
                <p className="text-muted-foreground mb-2">
                  Cookies can remain on your device for different periods of time:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Clock className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Session Cookies</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        These cookies are temporary and are deleted when you close your browser. They help us track your
                        actions during a single browser session.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Clock className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Persistent Cookies</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        These cookies remain on your device for a specified period or until you delete them manually.
                        They help us recognize you as a returning visitor and remember your preferences.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  Other Tracking Technologies
                </h3>
                <p className="text-muted-foreground">In addition to cookies, we may use other tracking technologies:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Web Beacons</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Small transparent image files used to track your movements on our website and determine if you
                        have opened an email we sent.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Pixels</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tiny code snippets on web pages that allow us and our partners to set cookies and collect
                        information about your browsing activities.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <HardDrive className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Local Storage</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        A technology that allows websites to store information locally on your device, similar to
                        cookies but with larger storage capacity.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <UserCog className="h-4 w-4 text-primary" />
                  Managing Cookies
                </h3>
                <p className="text-muted-foreground">
                  You have the right to decide whether to accept or reject cookies. You can set or modify your cookie
                  preferences in the following ways:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <UserCog className="h-3 w-3" />
                    </span>
                    <span>Through our cookie consent banner when you first visit our website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <UserCog className="h-3 w-3" />
                    </span>
                    <span>By accessing our cookie settings panel available in the footer of our website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <UserCog className="h-3 w-3" />
                    </span>
                    <span>By adjusting your browser settings to block or delete cookies</span>
                  </li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Please Note</h4>
                      <p className="text-amber-700 text-sm">
                        If you choose to block essential cookies, you may not be able to access certain features of our
                        website, and some functionality may not work correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
              <CardDescription>Understanding and exercising your data protection rights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Your Rights
                </h3>
                <p className="text-muted-foreground">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to request copies of your personal information that we hold about you.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Rectification</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to request that we correct any information you believe is inaccurate or
                      incomplete.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Erasure</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to request that we erase your personal information, subject to certain
                      exceptions.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Restrict Processing</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to request that we restrict the processing of your personal information under
                      certain circumstances.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Data Portability</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to request that we transfer the data we have collected to another organization
                      or directly to you.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <h4 className="font-medium">Right to Object</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You have the right to object to our processing of your personal information for direct marketing
                      purposes or based on legitimate interests.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <UserCog className="h-4 w-4 text-primary" />
                  How to Exercise Your Rights
                </h3>
                <p className="text-muted-foreground">You can exercise your rights by:</p>
                <ol className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-medium">Contacting Us</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send an email to privacy@affordpill.in with your specific request and the rights you wish to
                        exercise.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-medium">Account Settings</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Some rights can be exercised directly through your account settings, such as updating your
                        personal information or communication preferences.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-medium">Verification</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We may need to verify your identity before processing your request to ensure the security of
                        your information.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Response Timeline
                </h3>
                <p className="text-muted-foreground">
                  We will respond to your request within 30 days. If we need more time, we will inform you of the reason
                  and extension period in writing. If we deny your request, we will explain the reasons for our denial
                  and inform you of your right to file a complaint with a regulatory authority.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Limitations and Exceptions
                </h3>
                <p className="text-muted-foreground">
                  There may be situations where we cannot fulfill your request, such as:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-amber-100 p-1 text-amber-700 mt-0.5">
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                    <span>
                      When the information is necessary to complete a transaction or provide a service you requested
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-amber-100 p-1 text-amber-700 mt-0.5">
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                    <span>When we are required to keep the information by law or for legal proceedings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-amber-100 p-1 text-amber-700 mt-0.5">
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                    <span>When the information is necessary to detect security incidents or protect against fraud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-amber-100 p-1 text-amber-700 mt-0.5">
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                    <span>
                      When deletion would impair our ability to conduct scientific research or improve our services
                    </span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Marketing Communications
                </h3>
                <p className="text-muted-foreground">
                  You have the right to opt out of marketing communications we send you at any time. You can exercise
                  this right by:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Mail className="h-3 w-3" />
                    </span>
                    <span>Clicking the "unsubscribe" link in our marketing emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Mail className="h-3 w-3" />
                    </span>
                    <span>Adjusting your communication preferences in your account settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                      <Mail className="h-3 w-3" />
                    </span>
                    <span>Contacting our customer support team</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Important Note</h4>
                      <p className="text-blue-700 text-sm">
                        Even if you opt out of marketing communications, we may still send you important administrative
                        messages, such as order confirmations, prescription updates, and service announcements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
              <CardDescription>How we handle cross-border data transfers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Global Operations
                </h3>
                <p className="text-muted-foreground">
                  AffordPill is headquartered in India, but we may transfer, store, and process your information in
                  countries other than your own. This is necessary to provide our services and for the purposes
                  described in this Privacy Policy.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Important Notice</h4>
                      <p className="text-amber-700 text-sm">
                        The data protection laws in these countries may differ from those in your country of residence.
                        By using our services, you consent to the transfer of your information to these countries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Safeguards for International Transfers
                </h3>
                <p className="text-muted-foreground">
                  When we transfer your information internationally, we implement appropriate safeguards to ensure that
                  your information receives an adequate level of protection:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Standard Contractual Clauses</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We use standard contractual clauses approved by relevant regulatory authorities to ensure that
                        your information is protected when transferred outside of your country.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Data Processing Agreements</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        We enter into data processing agreements with our service providers that include provisions for
                        the protection of your information.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                      <Shield className="h-3 w-3" />
                    </span>
                    <div>
                      <span className="font-medium">Privacy Shield</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Where applicable, we work with service providers who are certified under privacy frameworks like
                        the EU-U.S. Privacy Shield.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  Data Storage Locations
                </h3>
                <p className="text-muted-foreground mb-2">Our primary data storage locations include:</p>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">India</h4>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Our primary servers and operations are located in India.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">United States</h4>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Some of our service providers, including Vercel, may store data in the United States.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">European Union</h4>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Some of our analytics and cloud services providers may store data in the European Union.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Compliance with Regional Privacy Laws
                </h3>
                <p className="text-muted-foreground">
                  We comply with various regional privacy laws that may apply to our processing of your information:
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">India</h4>
                    <p className="text-sm text-muted-foreground">
                      We comply with the Information Technology Act, 2000, and the Information Technology (Reasonable
                      Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">European Union</h4>
                    <p className="text-sm text-muted-foreground">
                      For users in the European Economic Area (EEA), we comply with the General Data Protection
                      Regulation (GDPR).
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">California, USA</h4>
                    <p className="text-sm text-muted-foreground">
                      For California residents, we comply with the California Consumer Privacy Act (CCPA) and the
                      California Privacy Rights Act (CPRA).
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-primary mb-2">Other Regions</h4>
                    <p className="text-sm text-muted-foreground">
                      We strive to comply with applicable data protection laws in all regions where we operate or have
                      users.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
              <CardDescription>How and when we update our privacy practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Policy Updates
                </h3>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
                  legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at
                  the top of this Privacy Policy.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Notification of Changes</h4>
                      <p className="text-blue-700 text-sm">
                        For significant changes to this Privacy Policy, we will make reasonable efforts to notify you,
                        such as by sending an email to the address associated with your account or displaying a
                        prominent notice on our website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Review of Changes
                </h3>
                <p className="text-muted-foreground">
                  We encourage you to review this Privacy Policy periodically to stay informed about our privacy
                  practices. Your continued use of our services after any changes to this Privacy Policy constitutes
                  your acceptance of the updated policy.
                </p>
                <div className="border rounded-md p-4 my-2">
                  <h4 className="font-medium mb-2">Previous Versions</h4>
                  <p className="text-sm text-muted-foreground">
                    If you wish to review previous versions of our Privacy Policy, you may contact us at
                    privacy@affordpill.in with your request.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Contact Us
                </h3>
                <p className="text-muted-foreground">
                  If you have any questions, concerns, or feedback about this Privacy Policy or our privacy practices,
                  please contact us at:
                </p>
                <div className="bg-muted p-4 rounded-md mt-2">
                  <p className="font-medium">AffordPill.com</p>
                  <p className="text-muted-foreground mt-1">Email: privacy@affordpill.in</p>
                  <p className="text-muted-foreground">Address: Kh.No.119, FF,Gali No-3, ChaterSinghComplex, Village Chhalera, Sector-37 Gautam Buddha Nagar UTTAR PRADESH 201301</p>
                  <p className="text-muted-foreground">Phone: 9266576156 </p>
                </div>
                <p className="text-muted-foreground mt-2">
                  We will respond to your inquiry as soon as possible, typically within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
              <CardDescription>How we handle information related to children</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Age Restrictions
                </h3>
                <p className="text-muted-foreground">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                  information from children under 18. If you are a parent or guardian and you believe that your child
                  has provided us with personal information, please contact us at privacy@affordpill.in.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Important Notice</h4>
                      <p className="text-red-700 text-sm">
                        If we become aware that we have collected personal information from a child under the age of 18
                        without verification of parental consent, we will take steps to remove that information from our
                        servers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Parental Consent
                </h3>
                <p className="text-muted-foreground">
                  In cases where a parent or guardian needs to manage medication for a child under 18, we require that
                  the parent or guardian create and manage the account. The parent or guardian is responsible for
                  providing consent and managing all interactions with our services on behalf of the child.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Contact Information</CardTitle>
          </div>
          <CardDescription>Get in touch with us for privacy-related questions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Privacy Inquiries</h3>
                <p className="text-sm text-muted-foreground">privacy@affordpill.in</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Data Protection Officer</h3>
                <p className="text-sm text-muted-foreground">dpo@affordpill.in</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Download Privacy Policy as PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/30 p-6 rounded-lg mt-8 text-center">
        <p className="font-medium">Last Updated: March 25, 2025</p>
        <p className="mt-2 text-muted-foreground">
          By using the AffordPill website or mobile application, you acknowledge that you have read, understood, and
          agree to this Privacy Policy.
        </p>
      </div>
    </div>
  )
}


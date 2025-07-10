"use client"

import {
  AlertTriangle,
  Book,
  CheckCircle,
  FileText,
  Info,
  Mail,
  Scale,
  Shield,
  ShieldAlert,
  Truck,
  User,
  Users,
} from "lucide-react"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditionsClientPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="max-w-[1320px] mx-auto py-8 px-6 md:px-8 lg:px-10 md:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Terms and Conditions</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          The domain name www.affordpill.com, an internet-based portal, and the AffordPill mobile application, is
          operated by Afford Pill.com
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>Important Information</CardTitle>
          </div>
          <CardDescription>Please read these terms carefully before using our services</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Legal Agreement</h3>
              <p className="text-sm text-muted-foreground">
                By using our platform, you agree to these terms and conditions
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Age Requirement</h3>
              <p className="text-sm text-muted-foreground">You must be 18 years or older to use our services</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
              <AlertTriangle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Prescription Required</h3>
              <p className="text-sm text-muted-foreground">
                Valid prescriptions are needed for prescription medications
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="general" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Eligibility</span>
              </TabsTrigger>
              <TabsTrigger value="platform" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Platform</span>
              </TabsTrigger>
              <TabsTrigger value="prescription" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Prescriptions</span>
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                <span>Delivery</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="liability" className="flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" />
                <span>Liability</span>
              </TabsTrigger>
              <TabsTrigger value="legal" className="flex items-center gap-1">
                <Scale className="h-4 w-4" />
                <span>Legal</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>Basic terms governing your use of AffordPill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  Agreement to Terms
                </h3>
                <p className="text-muted-foreground">
                  Your access or use of the Website, transactions on the Website, and use of Services are governed by
                  these terms and conditions (hereinafter referred to as the "Terms of Use"), including the applicable
                  policies which are incorporated herein by reference.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  Platform Services
                </h3>
                <p className="text-muted-foreground mb-2">The Website is a platform that facilitates:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Online purchase of pharmaceutical products sold by various third-party pharmacies ("Third Party
                      Pharmacies") and by the Company.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Diagnostic services offered by various third-party diagnostic centers ("Third Party Labs").
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Online medical consultancy services/second opinions offered by third-party independent doctors
                      ("Medical Experts").
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Online advertisements by sponsors advertising and marketing their own goods and services ("Third
                      Party Advertisers").
                    </span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  Changes to Terms
                </h3>
                <p className="text-muted-foreground">
                  AffordPill reserves the right to change or modify these Terms of Use or any policy or guideline of the
                  Website, including the Privacy Policy, at any time and in its sole discretion. Any changes or
                  modifications will be effective immediately upon posting the revisions on the Website, and You waive
                  any right You may have to receive specific notice of such changes or modifications.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applicable Laws</CardTitle>
              <CardDescription>Legal framework governing these terms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                These Terms of Use are published in compliance with, and are governed by, the provisions of Indian laws,
                including but not limited to:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Indian Contract Act, 1872</h4>
                    <p className="text-sm text-muted-foreground">Governing contractual relationships</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Information Technology Act, 2000</h4>
                    <p className="text-sm text-muted-foreground">Including related rules and guidelines</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Drugs and Cosmetics Act, 1940</h4>
                    <p className="text-sm text-muted-foreground">And the Drugs and Cosmetics Rules, 1945</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Pharmacy Act, 1948</h4>
                    <p className="text-sm text-muted-foreground">Regulating pharmacy practice</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Consumer Protection Act, 2019</h4>
                    <p className="text-sm text-muted-foreground">And Consumer Protection (E-Commerce) Rules, 2020</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-md">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">The Drugs and Magic Remedies Act, 1954</h4>
                    <p className="text-sm text-muted-foreground">Regulating advertisements of drugs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Requirements</CardTitle>
              <CardDescription>Who can use the AffordPill platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Age Requirement
                </h3>
                <p className="text-muted-foreground">
                  As a condition of Your use of the Website, You must be 18 (eighteen) years of age or older to use or
                  visit the Website in any manner. By visiting the Website or accepting these Terms of Use, You
                  represent and warrant to AffordPill that You are 18 (eighteen) years of age or older and that You have
                  the right, authority, and capacity to use the Website and agree to abide by these Terms of Use.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Registration Requirements
                </h3>
                <p className="text-muted-foreground mb-2">
                  For the purposes of availing the Services and/or transacting with the Third Party Service Providers
                  through the Website, You are required to obtain registration, in accordance with the procedure
                  established by AffordPill in this regard. As part of the registration process, AffordPill may collect
                  the following personal information from You:
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Name</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>User ID</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Email address</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Address (including country and ZIP/postal code)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Gender</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Age</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Phone number</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Password chosen by the User</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  User Responsibilities
                </h3>
                <p className="text-muted-foreground mb-2">You agree and acknowledge that You would:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Create only one account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Provide accurate, truthful, current, and complete information when creating Your account and in
                      all Your dealings through the Website
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Maintain and promptly update Your account information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Maintain the security of Your account by not sharing Your password with others and restricting
                      access to Your account and Your device
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Promptly notify AffordPill if You discover or suspect any security breaches relating to the
                      Website
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Functionality</CardTitle>
              <CardDescription>How AffordPill facilitates transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Platform to Facilitate Transaction of Business
                </h3>
                <p className="text-muted-foreground">
                  Through AffordPill.com, we facilitate the purchase of medicines and other pharmaceutical products
                  offered for sale by third-party pharmacies ("Pharmaceutical Goods and Services"). You acknowledge that
                  AffordPill.com merely acts as a platform and does not manufacture, store, or directly sell any
                  Pharmaceutical Goods and Services.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Representation as to Legal Title
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      AffordPill.com does not claim ownership of any Pharmaceutical Goods and Services listed by
                      third-party pharmacies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      At no time does AffordPill.com acquire legal title to any products displayed on the platform. All
                      ownership rights remain with the respective third-party pharmacies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      The third-party pharmacies bear full responsibility for ensuring they have the legal right to sell
                      the Pharmaceutical Goods and Services listed on AffordPill.com.
                    </span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Non-Performance of Contract
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Important Notice</h4>
                      <p className="text-amber-700 text-sm">
                        AffordPill.com is not responsible for any failure, delays, or breach of contract between users
                        and third-party pharmacies. We do not guarantee the performance of any transaction and are not
                        liable if a pharmacy fails to fulfill an order.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Third-party pharmacies are solely responsible for ensuring they have adequate stock to fulfill orders.
                  AffordPill.com does not take responsibility if a product is unavailable despite being listed on the
                  website.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Exhibition of Drugs and Third-Party Content
                </h3>
                <p className="text-muted-foreground">
                  Third-party pharmacies display their products and information on AffordPill.com. The accuracy of this
                  content is the sole responsibility of the respective pharmacy. AffordPill.com does not endorse or
                  verify any product descriptions, images, or claims made by third-party pharmacies.
                </p>
                <p className="text-muted-foreground">
                  Users are responsible for conducting their own verification of product information before purchasing.
                  AffordPill.com is not liable for any misleading or incorrect information provided by third-party
                  pharmacies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Drugs</CardTitle>
              <CardDescription>Requirements for purchasing prescription medications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Prescription Requirement</h4>
                    <p className="text-blue-700 text-sm">
                      Prescription drugs available on AffordPill.com require a valid medical prescription issued by a
                      registered doctor. Users must upload a scanned copy of the prescription at the time of purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Prescription Verification Process
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Orders for prescription drugs will only be processed after verification of the prescription by the
                      third-party pharmacy. If the pharmacy finds any discrepancies, the order will be canceled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Users must present the original prescription at the time of delivery. If the prescription is not
                      available, the delivery agent has the right to withhold the medicine.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>AffordPill.com maintains a record of all prescriptions uploaded by users.</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Substitution of Prescribed Drugs
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-2">When Substitution is Allowed</h4>
                    <p className="text-green-700 text-sm">
                      A substitute medicine will only be provided if explicitly allowed by the prescribing doctor or if
                      the prescription lists only the generic salt name instead of a specific brand.
                    </p>
                  </div>
                  <div className="border rounded-md p-4 bg-red-50">
                    <h4 className="font-medium text-red-800 mb-2">When Substitution is Not Allowed</h4>
                    <p className="text-red-700 text-sm">
                      If no substitution is permitted by the prescription, the third-party pharmacy will not dispense an
                      alternative product.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Invitation to Offer for Sale
                </h3>
                <p className="text-muted-foreground">
                  The listing of pharmaceutical products on AffordPill.com is merely an "invitation to offer for sale"
                  and does not constitute a direct "offer for sale". When a user places an order, it is considered an
                  "offer" to purchase. The confirmation email sent by AffordPill.com is not an acceptance of this offer.
                </p>
                <p className="text-muted-foreground">
                  The offer is accepted only after the third-party pharmacy verifies the prescription (if applicable)
                  and confirms product availability. Any reference to "offered for sale" in these terms should be
                  understood as an "invitation to offer for sale" by the third-party pharmacies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery and Transfer of Property</CardTitle>
              <CardDescription>How products are delivered and when ownership transfers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Transfer of Property and Completion of Sale
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Upon acceptance of the offer by the third-party pharmacy, the Pharmaceutical Goods and Services
                      will be dispensed in accordance with the user's order.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Ownership and title of the medicines transfer to the user immediately upon dispensation and
                      issuance of the invoice at the third-party pharmacy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      The sale is considered complete once the invoice is issued by the concerned third-party pharmacy.
                      AffordPill.com does not retain any ownership over the medicines at any stage.
                    </span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Delivery of Drugs
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Delivery Process</h4>
                      <p className="text-blue-700 text-sm">
                        Users may appoint an individual ("User Agent") to collect medicines from the third-party
                        pharmacy on their behalf. The User Agent acts as a representative of the buyer, and
                        AffordPill.com merely facilitates the connection between users and pharmacies.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  AffordPill.com does not undertake the delivery of medicines and is not responsible for any issues
                  arising during transit. The delivery is handled by third-party delivery partners or the pharmacy's own
                  delivery service.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-4">
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium">Delivery Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    Delivery times vary based on location and product availability
                  </p>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium">Documentation</h4>
                  <p className="text-sm text-muted-foreground">Original prescription must be presented at delivery</p>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium">Product Integrity</h4>
                  <p className="text-sm text-muted-foreground">Check product condition and expiry date upon delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Development & Review Process</CardTitle>
              <CardDescription>How we create and verify health information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary" />
                  The Mission and Vision Behind AffordPill.com Content
                </h3>
                <p className="text-muted-foreground">
                  At AffordPill.com, we are dedicated to providing accurate, evidence-based, and scientifically
                  validated health information to the public. Our primary goal is to ensure that all medical,
                  pharmaceutical, and healthcare-related content on our platform is reliable, credible, and free from
                  bias.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary" />
                  What AffordPill.com Content Covers
                </h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">General Health & Medical Awareness</h4>
                    <p className="text-sm text-muted-foreground">
                      Covering major diseases, symptoms, causes, prevention, treatments, and expert recommendations.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Drug Information & Pharmaceutical Research</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed insights on prescription medications, over-the-counter drugs, herbal supplements, and
                      alternative medicine.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Disease Prevention & Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Information on chronic diseases like diabetes, heart disease, hypertension, cancer, and
                      respiratory conditions.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Mental Health & Well-being</h4>
                    <p className="text-sm text-muted-foreground">
                      Articles on stress management, depression, anxiety, and lifestyle modifications.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Nutritional Science & Dietary Guidance</h4>
                    <p className="text-sm text-muted-foreground">
                      Expert insights on superfoods, vitamins, minerals, and diet-based disease management.
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-primary">Fitness & Lifestyle Choices</h4>
                    <p className="text-sm text-muted-foreground">
                      Best practices for exercise, weight management, yoga, meditation, and overall well-being.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary" />
                  The Three-Tier Editorial Structure for Accuracy and Reliability
                </h3>
                <p className="text-muted-foreground mb-2">
                  Every article, research paper, and drug information guide on AffordPill.com undergoes a three-tier
                  editorial process to ensure its authenticity, accuracy, and scientific validity:
                </p>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                        <span className="font-bold text-blue-700">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">Initial Content Research & Development</h4>
                        <ul className="text-blue-700 text-sm space-y-1 mt-1">
                          <li>
                            Content is thoroughly researched using sources like medical journals, clinical studies,
                            government health databases, and peer-reviewed publications.
                          </li>
                          <li>
                            A team of medical writers and subject matter experts drafts the article, ensuring clarity,
                            comprehensiveness, and relevance.
                          </li>
                          <li>
                            The initial draft includes citations from authentic medical sources, avoiding any unverified
                            or anecdotal claims.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 bg-green-50">
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                        <span className="font-bold text-green-700">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Medical Review & Fact-Checking</h4>
                        <ul className="text-green-700 text-sm space-y-1 mt-1">
                          <li>
                            A qualified medical expert (MBBS, MD, PhD, or PharmaD) reviews the content, ensuring medical
                            accuracy, compliance, and adherence to global health standards.
                          </li>
                          <li>
                            The review process follows guidelines from organizations like WHO, FDA, CDC, ICMR, and
                            National Institute of Health (NIH).
                          </li>
                          <li>
                            Any errors, outdated references, or inaccuracies are corrected, and the latest medical
                            research is incorporated before final approval.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 bg-purple-50">
                    <div className="flex items-start gap-2">
                      <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                        <span className="font-bold text-purple-700">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-800">Final Editorial & Ethical Compliance Check</h4>
                        <ul className="text-purple-700 text-sm space-y-1 mt-1">
                          <li>
                            The final article is evaluated for ethical standards, neutrality, and fairness before
                            publication.
                          </li>
                          <li>
                            Content undergoes plagiarism checks, readability improvements, and formatting adjustments
                            for ease of understanding.
                          </li>
                          <li>
                            A senior editorial board member signs off on the content, ensuring it meets all publication
                            standards.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Liability and Disclaimers</CardTitle>
              <CardDescription>Limitations of liability and important disclaimers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Important Disclaimer</h4>
                    <p className="text-red-700 text-sm">
                      Affordpill is not responsible for any losses, damages, injuries, or expenses incurred by users,
                      vendors, or third-party service providers due to use of our platform. The services are provided
                      "as is" and "as available" without any express or implied warranties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  No Guarantees on Products and Services
                </h3>
                <p className="text-muted-foreground mb-2">
                  Affordpill does not provide any guarantees or warranties—express or implied—about the goods,
                  medicines, or services available on the platform. This includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Product Quality and Fit</strong> – Affordpill does not guarantee that medicines or
                      healthcare products are merchantable, fit for a specific use, accurately described, or free from
                      infringement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Legal Ownership</strong> – Affordpill does not verify whether Third-Party Pharmacies and
                      service providers have legal ownership or rights over the goods they sell.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong>Medical Advice and e-Prescriptions</strong> – Affordpill does not validate or verify
                      medical advice, e-prescriptions, or diagnostic results provided by healthcare professionals or
                      third-party labs.
                    </span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Security and Malware Risks
                </h3>
                <p className="text-muted-foreground">
                  Affordpill is not responsible for any damage, data loss, or malware infections that may occur due to
                  browsing the website, downloading content, using third-party links, or engaging with external service
                  providers. If a user experiences technical issues or security threats, their only recourse is to stop
                  using the website.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Medical Consultation Limitations
                </h3>
                <div className="border rounded-md p-4">
                  <p className="text-muted-foreground mb-2">
                    For online consultations, Affordpill assigns a Medical Expert based on the type of treatment
                    (Allopathy, Homeopathy, or Ayurveda) and the condition specified by the user. However, Affordpill:
                  </p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Does not influence medical decisions made by doctors</li>
                    <li>• Is not responsible for misdiagnoses or incorrect treatments</li>
                    <li>• Does not guarantee the qualifications or reliability of listed Medical Experts</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Platform Limitations and Liability Cap
                </h3>
                <p className="text-muted-foreground">
                  Affordpill acts only as a facilitator and is not responsible for cancellations, delays, or failures on
                  the part of Third-Party Pharmacies, Labs, or Healthcare Providers.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                  <p className="text-amber-800 font-medium">
                    In no event shall the total aggregate liability of Affordpill exceed INR 1,000 (Indian Rupees One
                    Thousand only) for all claims combined, including any losses, damages, or causes of action.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Legal Matters</CardTitle>
              <CardDescription>Governing law, dispute resolution, and termination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Intellectual Property Rights
                </h3>
                <p className="text-muted-foreground mb-2">
                  All content on the Website, including but not limited to logos, trademarks, images, graphics, text,
                  software, and designs, is the exclusive property of Affordpill unless otherwise specified.
                </p>
                <p className="text-muted-foreground">Users agree not to:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Modify, copy, reproduce, distribute, republish, or download any material from the Website.</li>
                  <li>• Circumvent or disable security features that protect intellectual property.</li>
                  <li>• Reverse-engineer, decompile, or attempt to extract the source code of the Website.</li>
                  <li>
                    • Use the Affordpill brand name, trademarks, or copyrighted content without written permission.
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Termination
                </h3>
                <p className="text-muted-foreground mb-2">
                  These Terms of Use shall remain in effect until terminated by either party. Users may terminate their
                  agreement by:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">User Termination</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Ceasing access to the Website</li>
                      <li>• Closing their account on Affordpill</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Affordpill Termination Rights</h4>
                    <p className="text-muted-foreground text-sm">
                      Affordpill reserves the right to terminate or suspend any user's access at any time, with or
                      without notice, for violations of these Terms of Use or any applicable laws.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Governing Law & Dispute Resolution
                </h3>
                <div className="border rounded-md p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-2">Legal Framework</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    These Terms of Use shall be governed by the laws of India, without reference to conflict of law
                    principles.
                  </p>
                  <p className="text-blue-700 text-sm">Any disputes arising from these Terms shall be subject to:</p>
                  <ul className="space-y-1 text-blue-700 text-sm mt-1">
                    <li>
                      • Arbitration in New Delhi, conducted in English, under the Arbitration and Conciliation Act,
                      1996.
                    </li>
                    <li>
                      • If arbitration fails, disputes will fall under the exclusive jurisdiction of the courts in New
                      Delhi.
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Account Deletion
                </h3>
                <p className="text-muted-foreground mb-2">
                  Deleting an account is permanent and irreversible. Users who wish to delete their account must follow
                  these steps:
                </p>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>Download the Affordpill app.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>Navigate to: Need Help → Profile → How do I delete my account?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>Confirm the deletion request.</span>
                  </li>
                </ol>
                <p className="text-muted-foreground mt-2">
                  Once deleted, the account cannot be restored, and users will need to create a new account to use
                  Affordpill again.
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
          <CardDescription>Get in touch with us for questions or concerns</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@affordpill.in</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Grievance Redressal</h3>
                <p className="text-sm text-muted-foreground">Refer to our Grievance Redressal Policy</p>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>

      <div className="bg-muted/30 p-6 rounded-lg mt-8 text-center">
        <p className="font-medium">Last Updated: March 25, 2025</p>
        <p className="mt-2 text-muted-foreground">
          By using the AffordPill website or mobile application, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  )
}


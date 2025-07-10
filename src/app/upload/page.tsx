import type { Metadata } from "next"
import PrescriptionUploadForm from "@/components/prescription/prescription-upload-form"

export const metadata: Metadata = {
  title: "Upload Prescription | AffordPill",
  description: "Upload your prescription for our pharmacists to review and process your medication order.",
}

export default function PrescriptionUploadPage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Upload Prescription</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Upload your prescription and our pharmacists will review it and provide you with medication options.
        </p>
      </div>

      <PrescriptionUploadForm />
    </div>
  )
}

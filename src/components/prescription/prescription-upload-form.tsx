"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FileUploader } from "@/components/prescription/file-uploader"
import { createClient } from "@/utils/supabase/browser"
import toast from "react-hot-toast"
import { Upload, Loader2, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getPrescriptionImageUrl } from "@/lib/get-prescription-image-url"

export default function PrescriptionUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a prescription file to upload")
      return
    }

    setUploading(true)
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        toast.error("Authentication error. Please log in again.")
        router.push("/login?redirectUrl=/upload")
        return
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("prescriptions")
        .upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        throw new Error("Failed to upload file")
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("prescriptions").getPublicUrl(uploadData?.path || "")

      console.log("Inserting prescription record for user:", user.id)
      console.log("File URL:", publicUrl)

      const { data: prescriptionData, error: prescriptionError } = await supabase
        .from("prescriptions")
        .insert({
          user_id: user.id,
          file_url: publicUrl,
          status: "pending",
        })
        .select()

      if (prescriptionError) {
        console.error("Prescription insert error:", prescriptionError)
        throw prescriptionError
      }

      setUploadedUrl(publicUrl)
      setProcessedImageUrl(getPrescriptionImageUrl(publicUrl))
      toast.success("Prescription uploaded successfully")

      setTimeout(() => {
        router.push("/account/prescriptions")
      }, 2000)
    } catch (error: any) {
      console.error("Error uploading prescription:", error)
      toast.error(error.message || "Failed to upload prescription")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-sm border rounded-lg overflow-hidden">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold">Upload Your Prescription</CardTitle>
        <CardDescription className="mt-2 text-base">
          Upload a clear image of your prescription for our pharmacists to review
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-6">
        {!uploadedUrl ? (
          <>
            <div className="space-y-4">
              <Label className="text-base font-medium">Upload Prescription</Label>
              <FileUploader
                onFileSelected={handleFileSelected}
                acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
                maxFileSizeMB={5}
              />
              <p className="text-sm text-muted-foreground">Accepted formats: JPG, PNG, PDF (Max: 5MB)</p>
            </div>

            <div
              className="mt-6 rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                padding: "2px",
              }}
            >
              <Alert className="rounded-lg bg-white dark:bg-background m-0 flex gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <AlertTitle className="font-medium text-base">Prescription Guidelines</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    Make sure your prescription is clearly visible, includes all medications, and is signed by your
                    doctor. Our pharmacists will review your prescription and prepare your order accordingly.
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className="rounded-xl overflow-hidden w-full max-w-sm"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                padding: "2px",
              }}
            >
              <div className="bg-white dark:bg-background rounded-lg p-4 h-full">
                {processedImageUrl && (
                  <img
                    src={processedImageUrl || "/placeholder.svg"}
                    alt="Uploaded prescription"
                    className="max-h-64 w-full object-contain"
                    onError={() => {
                      toast.error("Unable to load prescription image preview")
                    }}
                  />
                )}
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-green-600 font-medium">Prescription uploaded successfully</p>
              <p className="text-muted-foreground mt-2">
                Our pharmacists will review your prescription shortly and notify you once processed.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-8 pb-8 pt-2">
        {!uploadedUrl ? (
          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full py-6 text-base font-medium">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload Prescription
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => router.push("/account/prescriptions")}
            className="w-full py-6 text-base font-medium"
          >
            View My Prescriptions
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}


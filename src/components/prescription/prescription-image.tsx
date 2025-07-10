// components/prescription/prescription-image.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/browser";
import { FileText } from 'lucide-react';

interface PrescriptionImageProps {
  fileUrl: string;
  alt?: string;
  className?: string;
}

export default function PrescriptionImage({ fileUrl, alt = "Prescription", className = "" }: PrescriptionImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMounted = useRef(true);
  const uniqueId = useRef(`img-${Math.random().toString(36).substring(2, 9)}`);
  
  const supabase = createClient();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function getSignedUrl() {
      if (!fileUrl) {
        if (isMounted.current) setLoading(false);
        return;
      }

      try {
        console.log(`[${uniqueId.current}] Processing URL:`, fileUrl);
        
        const bucketName = 'prescriptions';
        
        // Extract  file path from the URL
        let filePath = fileUrl;
        
        if (fileUrl.includes('supabase.co') || fileUrl.includes('/storage/')) {
          const parts = fileUrl.split(bucketName + '/');
          if (parts.length > 1) {
            filePath = parts[1].split('?')[0]; // Remove query parameters
          } else {
            console.log(`[${uniqueId.current}] Could not extract path from URL:`, fileUrl);
            if (isMounted.current) {
              setLoading(false);
              setError(true);
            }
            return;
          }
        } 
        else if (!fileUrl.startsWith('http') && !fileUrl.startsWith(bucketName)) {
          filePath = fileUrl;
        }
        else if (fileUrl.startsWith(bucketName + '/')) {
          filePath = fileUrl.substring(bucketName.length + 1);
        }
        
        console.log(`[${uniqueId.current}] Getting signed URL for:`, { bucketName, filePath });
        
        const { data, error: supabaseError } = await supabase
          .storage
          .from(bucketName)
          .createSignedUrl(filePath, 3600);
        
        if (supabaseError) {
          console.error(`[${uniqueId.current}] Error creating signed URL:`, supabaseError);
          if (isMounted.current) {
            setLoading(false);
            setError(true);
          }
          return;
        }
        
        console.log(`[${uniqueId.current}] Successfully got signed URL`);
        if (isMounted.current) {
          setImageUrl(data.signedUrl);
          setLoading(false);
        }
      } catch (error) {
        console.error(`[${uniqueId.current}] Error processing image URL:`, error);
        if (isMounted.current) {
          setLoading(false);
          setError(true);
        }
      }
    }

    setLoading(true);
    setError(false);
    setImageUrl(null);
    
    const timeoutId = setTimeout(() => {
      getSignedUrl();
    }, uniqueId.current.charCodeAt(4) % 5 * 100); 
    
    return () => clearTimeout(timeoutId);
  }, [fileUrl, supabase]);

  if (!fileUrl || loading) {
    return (
      <div className={`flex items-center justify-center h-full w-full text-muted-foreground ${className}`}>
        <FileText className="h-10 w-10 opacity-50" />
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex items-center justify-center h-full w-full text-muted-foreground ${className}`}>
        <FileText className="h-10 w-10 opacity-50" />
        <span className="text-sm ml-2">Unable to load image</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl || "/placeholder.svg"} 
      alt={alt} 
      className={className}
      onError={() => {
        if (isMounted.current) {
          setImageUrl(null);
          setError(true);
        }
      }}
    />
  );
}
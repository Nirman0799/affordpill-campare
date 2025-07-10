// src/lib/get-prescription-image-url.ts
export function getPrescriptionImageUrl(fileUrl: string): string {
    if (!fileUrl) return '';
    
    let filePath = '';
    
    if (fileUrl.includes('/storage/v1/object/public/prescriptions/')) {
      const parts = fileUrl.split('/storage/v1/object/public/prescriptions/');
      filePath = parts[1];
    } else if (fileUrl.includes('/prescriptions/')) {
      const parts = fileUrl.split('/prescriptions/');
      filePath = parts[1];
    } else {
      filePath = fileUrl;
    }
    
    // return URL to  API 
    return `/api/prescriptions/image?path=${encodeURIComponent(filePath)}`;
  }
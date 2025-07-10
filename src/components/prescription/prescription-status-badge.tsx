// src/components/prescription/prescription-status-badge.tsx
import { Badge } from "@/components/ui/badge";

interface PrescriptionStatusBadgeProps {
  status: string;
}

export function PrescriptionStatusBadge({ status }: PrescriptionStatusBadgeProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { variant: "secondary", label: "Pending Review" };
      case "verified":
        return { variant: "success", label: "Verified" };
      case "rejected":
        return { variant: "destructive", label: "Rejected" };
      case "invoiced":
        return { variant: "warning", label: "Invoice Sent" };
      case "fulfilled":
        return { variant: "default", label: "Fulfilled" };
      default:
        return { variant: "outline", label: status };
    }
  };

  const badgeInfo = getStatusBadge(status);
  
  return (
    <Badge variant={badgeInfo.variant as any}>
      {badgeInfo.label}
    </Badge>
  );
}
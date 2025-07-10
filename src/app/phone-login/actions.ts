// src/app/phone-login/actions.ts

"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string || undefined;
  // format phone number 
  const formattedPhone = formatIndianPhoneNumber(phone);
  
  console.log("Attempting to send OTP to:", formattedPhone);
  if (email) console.log("Using email:", email);
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    // generate a placeholder
    const placeholderEmail = email || `${phone.replace(/\D/g, "")}@example.com`;
    
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        data: {
          email: placeholderEmail,
          phone_number: formattedPhone
        }
      }
    });

    if (error) {
      console.error("OTP Send Error Details:", {
        message: error.message,
        status: error.status,
        name: error.name,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      return redirect(`/phone-login?message=${encodeURIComponent("Error: " + error.message)}`);
    }
    
    console.log("OTP sent successfully");
    return redirect(`/phone-login?message=Check your phone for the OTP&phone=${encodeURIComponent(formattedPhone)}`);
  } catch (err: any) {
    console.error("Unexpected error during OTP send:", err);
    const errorMsg = err?.message || "Could not send OTP";
    return redirect(`/phone-login?message=${encodeURIComponent(errorMsg)}`);
  }
};

export const verifyOTP = async (formData: FormData) => {
  const phone = formData.get("phone") as string;
  const token = formData.get("token") as string;
  const formattedPhone = formatIndianPhoneNumber(phone);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token,
      type: "sms"
    });

    if (error) {
      console.error("OTP Verification Error:", error);
      return redirect(`/phone-login?message=${encodeURIComponent(error.message)}&phone=${encodeURIComponent(formattedPhone)}`);
    }

    return redirect("/");
  } catch (err: any) {
    console.error("Unexpected error during OTP verification:", err);
    const errorMsg = err?.message || "Could not verify OTP";
    return redirect(`/phone-login?message=${encodeURIComponent(errorMsg)}&phone=${encodeURIComponent(phone)}`);
  }
};

// format Indian phone number
function formatIndianPhoneNumber(phone: string) {
  let digits = phone.replace(/\D/g, "");
  // check for 10-digit number if true add +91
  if (digits.length === 10) {
    return "+91" + digits;
  }
  
  if (digits.startsWith("91") && digits.length === 12) {
    return "+" + digits;
  }
  
  if (phone.startsWith("+")) {
    return phone;
  }
  
  return "+" + digits;
}
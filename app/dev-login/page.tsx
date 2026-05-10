"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWViMzVlNS1mNTRhLTQzNjUtYjA3Ny0wMzNlNGFiYWIzOGUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3ODQ0MjQ0NywiZXhwIjo0OTAyNjQ0ODQ3fQ.zLXgXtGmFlzoU2bSOGRnaErdtxq-u6mtNfGhjjJEy5g";
const USER = {
  id: "ceeb35e5-f54a-4365-b077-033e4abab38e",
  firstName: "asdfadf",
  role: "USER",
  needsOnboarding: false,
};

export default function DevLogin() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("token", TOKEN);
    localStorage.setItem("user", JSON.stringify(USER));
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-500 text-sm">
      Logging in...
    </div>
  );
}

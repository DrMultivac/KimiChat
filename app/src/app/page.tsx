"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace("/chat"); }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))" }}>
          <span className="text-2xl text-white font-bold">K</span>
        </div>
        <p className="text-muted">Loading KIMI...</p>
      </div>
    </div>
  );
}

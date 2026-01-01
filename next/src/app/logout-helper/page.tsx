"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutHelper() {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    router.push("/login");
  }, [router]);

  return <div>Logging out...</div>;
}

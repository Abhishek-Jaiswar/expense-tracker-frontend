"use client";

import React, { useEffect } from "react";
import Overview from "./_components/Overview";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <Overview />
    </div>
  );
};

export default Dashboard;

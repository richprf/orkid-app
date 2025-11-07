"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Category from "@/components/category/category";
import Reports from "@/components/reports/Reports";
import { Card, CardHeader, CardBody, Spacer } from "@heroui/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        در حال بررسی وضعیت ورود...
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome back  {session?.user?.name || ""}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="font-semibold text-gray-700">
            Active Habits
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-green-600">12</p>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="font-semibold text-gray-700">
            Completed
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-blue-600">78%</p>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="font-semibold text-gray-700">
            Days Streak
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-orange-500">7</p>
          </CardBody>
        </Card>
      </div>

      <Spacer y={2} />

      <div>
        <Category />
      </div>

      <div className="mt-10">
        <Reports />
      </div>
    </div>
  );
}

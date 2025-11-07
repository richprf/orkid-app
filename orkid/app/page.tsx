"use client";

import Category from "@/components/category/category";
import CategoryModal from "@/components/common/Modal";
import Reports from "@/components/reports/Reports";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Spacer,
  useDisclosure,
} from "@heroui/react";

export default function Home() {
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onOpenChange: onReportOpenChange,
  } = useDisclosure();
  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Welcome back 👋</h2>

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

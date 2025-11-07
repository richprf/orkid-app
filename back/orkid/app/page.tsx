"use client"

import Category from "@/components/category/category";
import { Card, CardHeader, CardBody, Button, Spacer } from "@heroui/react";

export default function Home() {
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
        <h3 className="text-2xl font-semibold mb-4">Today's Habits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2 text-lg">📚 Read 20 pages</div>
            <Button color="success" variant="flat">
              Done
            </Button>
          </Card>

          <Card className="p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2 text-lg">🏃 Run 3km</div>
            <Button color="success" variant="flat">
              Done
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

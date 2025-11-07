"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Progress } from "@heroui/react";

const Reports = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: getUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3001/api/users/${user?.email}`
      );
      return res.data;
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["habitReport", getUser?.id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3001/api/habit-log/report/${getUser?.id}`
      );
      
      const reportData = res.data;

      const habits = await axios.get("http://localhost:3001/api/habit");

      return reportData.map((r: any) => {
        const habit = habits.data.find((h: any) => h.id === r.habitId);
        return {
          ...r,
          title: habit ? habit.title : "بدون عنوان",
        };
      });
    },
    enabled: !!getUser?.id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
        <span className="ml-2 text-gray-600">در حال بارگذاری...</span>
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-center text-red-500 py-10">
        خطا در دریافت گزارش عادت‌ها 
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        گزارش ۳۰ روز اخیر
      </h2>

      <div className="space-y-5">
        {data.map((item: any) => {
          const completedDays = item._count._all;
          const percentage = (completedDays / 30) * 100;

          return (
            <div
              key={item.habitId}
              className="border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700 font-medium">{item.title}</span>
                <span className="text-sm text-gray-500">
                  {completedDays} / 30 روز
                </span>
              </div>
              <Progress
                value={percentage}
                color={
                  percentage > 75
                    ? "success"
                    : percentage > 40
                    ? "warning"
                    : "danger"
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;

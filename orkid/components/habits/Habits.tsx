"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Folder } from "lucide-react";
import { Button } from "@heroui/react";
import CategoryModal from "../common/Modal";
import UpdateHabit from "./UpdateHabits";
import { useState } from "react";
import { useSession } from "next-auth/react";

type HabitsProps = {
  id: string;
};

type Habit = {
  id: string;
  categoryId: string;
  title: string;
  description?: string;
  createdAt?: string;
};

type HabitLog = {
  id: string;
  habitId: string;
  completed: boolean;
  date: string;
};

const Habits = ({ id }: HabitsProps) => {
  const queryClient = useQueryClient();
  const [openHabitId, setOpenHabitId] = useState<string | null>(null);

  const { data: session } = useSession();
  const user = session?.user;

  const { data, isLoading, isError } = useQuery<Habit[]>({
    queryKey: ["habits", user?.id],
    queryFn: async () => {
      const userRes = await axios.get(
        `http://localhost:3001/api/users/${user?.email}`
      );
      const userId = userRes.data.id;
      const res = await axios.get<Habit[]>(
        `http://localhost:3001/api/habit/user/${userId}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: habitsLogs } = useQuery<HabitLog[]>({
    queryKey: ["habitslog"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/api/habit-log");
      return res.data;
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await axios.patch(
        `http://localhost:3001/api/habit-log/${id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitslog"] });
      queryClient.invalidateQueries({ queryKey: ["habitReport"] });
    },
  });

  const { mutate: createLog } = useMutation({
    mutationFn: async (habitId: string) => {
      return await axios.post(`http://localhost:3001/api/habit-log`, {
        habitId,
        completed: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitslog"] });
      queryClient.invalidateQueries({ queryKey: ["habitReport"] });
    },
  });

  const { mutate: deleteHabit } = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`http://localhost:3001/api/habit/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const filteredHabits = data?.filter((item) => item.categoryId === id);

  console.log("habir", filteredHabits);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600 text-sm">در حال بارگذاری...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center py-6 text-sm">
        خطایی در دریافت اطلاعات رخ داده است.
      </div>
    );

  if (!filteredHabits || filteredHabits.length === 0)
    return (
      <div className="text-center text-gray-500 py-8 text-sm">
        هیچ عادتی برای این دسته وجود ندارد.
      </div>
    );

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredHabits.map((item) => {
          const habitLog = habitsLogs?.find((log) => log.habitId === item.id);
          const isCompleted = habitLog?.completed === true;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Folder className="w-6 h-6 text-gray-400" />
                  <h3 className="text-base font-semibold text-gray-800 truncate max-w-[140px]">
                    {item.title}
                  </h3>
                </div>
                <Button
                  onPress={() => {
                    if (habitLog) {
                      update({
                        id: habitLog.id,
                        data: { completed: !habitLog.completed },
                      });
                    } else {
                      createLog(item.id);
                    }
                  }}
                  size="sm"
                  color={isCompleted ? "success" : "danger"}
                  variant="flat"
                  className="text-xs px-3"
                >
                  {isCompleted ? "انجام شده" : "انجام نشده"}
                </Button>
              </div>

              {item.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {item.description}
                </p>
              )}

              <p className="text-xs text-gray-400">
                تاریخ ساخت:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("fa-IR")
                  : "نامشخص"}
              </p>

              <button
                onClick={() => deleteHabit(item.id)}
                className="text-red-500 mt-2"
              >
                {" "}
                delete{" "}
              </button>
              <div className="mt-3  text-orange-600 cursor-pointer">
                <div onClick={() => setOpenHabitId(item.id)}>ویرایش</div>

                <CategoryModal
                  isOpen={openHabitId === item.id}
                  onOpenChange={(open) => !open && setOpenHabitId(null)}
                  title={`ویرایش ${item.title}`}
                >
                  <UpdateHabit
                    id={item.id}
                    onClose={() => setOpenHabitId(null)}
                  />
                </CategoryModal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Habits;

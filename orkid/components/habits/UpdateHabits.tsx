"use client";

import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect } from "react";

type UpdateHabitProps = {
  id: string;
  onClose: () => void;
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-600 text-sm">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : null}
    </>
  );
}

const UpdateHabit = ({ id, onClose }: UpdateHabitProps) => {
  const queryClient = useQueryClient();
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

  const { data: habit, isLoading } = useQuery({
    queryKey: ["habit", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/api/habit/${id}`);
      return res.data;
    },
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (habitData: {
      title: string;
      description: string;
      categoryId: string;
      userId: string;
    }) => {
      await axios.patch(`http://localhost:3001/api/habit/${id}`, habitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      onClose();
    },
    onError: (err) => {
      console.error("Error updating habit:", err);
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      if (!user?.id || !habit) return;

      const habitData = {
        title: value.title,
        description: value.description,
        categoryId: habit.categoryId,
        userId: getUser?.id,
      };

      console.log(habitData);

      mutate(habitData);
    },
  });

  useEffect(() => {
    if (habit) {
      form.setFieldValue("title", habit.title || "");
      form.setFieldValue("description", habit.description || "");
    }
  }, [habit]);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-6">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">ویرایش عادت</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "عنوان الزامی است"
                  : value.length < 3
                  ? "حداقل ۳ کاراکتر وارد کنید"
                  : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  عنوان
                </label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "توضیحات الزامی است"
                  : value.length < 3
                  ? "حداقل ۳ کاراکتر وارد کنید"
                  : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  توضیحات
                </label>
                <textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <button
              type="submit"
              disabled={!canSubmit || isPending}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          )}
        />

        {isSuccess && (
          <p className="text-green-600 mt-2">عادت با موفقیت ویرایش شد </p>
        )}
        {isError && <p className="text-red-600 mt-2">خطا در ویرایش عادت </p>}
      </form>
    </div>
  );
};

export default UpdateHabit;

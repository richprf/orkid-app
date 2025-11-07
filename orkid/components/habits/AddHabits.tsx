"use client";

import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import React from "react";

type HabitsProps = {
  id: string; 
  onClose: () => void;
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-600">{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? (
        <span className="text-gray-500">Validating...</span>
      ) : null}
    </>
  );
}

const AddHabits = ({ id , onClose }: HabitsProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = session?.user;




  const {data:getUser} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/api/users/${user?.email}`)
      return res.data
    }
  })

  console.log("get user" , getUser)

  const { mutate, isPending, isSuccess, isError } = useMutation<
    void,
    unknown,
    { title: string; description: string; categoryId: string; userId: string }
  >({
    mutationFn: async (habitData) => {
      await axios.post("http://localhost:3001/api/habit", habitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      onClose();
    },
    onError: (err) => {
      console.error(" Error creating habit:", err);
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      if (!user?.id) return;
      const habitData = {
        title: value.title,
        description: value.description,
        frequency: "daily",
        categoryId: id,
        userId: getUser?.id,
      };

      mutate(habitData);
      console.log(habitData);
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
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
                  ? "Title is required"
                  : value.length < 3
                  ? "Title must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  Title
                </label>
                <input
                  id={field.name}
                  name={field.name}
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
                  ? "Description is required"
                  : value.length < 3
                  ? "Description must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  Description
                </label>
                <input
                  id={field.name}
                  name={field.name}
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
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isPending}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isPending ? "Adding..." : "Add Habit"}
            </button>
          )}
        />

        {isSuccess && (
          <p className="text-green-600 mt-2"> Habit added successfully!</p>
        )}
        {isError && <p className="text-red-600 mt-2"> Error adding habit.</p>}
      </form>
    </div>
  );
};

export default AddHabits;

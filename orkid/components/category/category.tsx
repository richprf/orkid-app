"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@heroui/react";
import CategoryList from "@/components/category/CategoryList";
import AddCategoryModal from "@/components/category/AddCategoryModal";
import { useSession } from "next-auth/react";

export default function Category() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

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

  console.log("getUser", getUser);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", getUser?.id],
    queryFn: async () => {
      if (!getUser?.id) return [];
      const res = await axios.get(
        `http://localhost:3001/api/category/user/${getUser.id}`
      );
      return res.data;
    },
    enabled: !!getUser?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:3001/api/category/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800"> Categories</h1>
        <Button color="primary" onPress={() => setIsOpen(true)}>
          + Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        isLoading={isLoading}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <AddCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

"use client";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import CategoryCard from "./CategoryCard";

export default function CategoryList({
  categories,
  isLoading,
  onDelete,
}: {
  categories?: any[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}) {
  if (isLoading) return <p>Loading...</p>;

  if (!categories?.length)
    return (
      <p className="text-gray-500 text-center mt-10">
        No categories found. Create one!
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} onDelete={onDelete} />
      ))}
    </div>
  );
}

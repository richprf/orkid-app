"use client";
import { Card, CardHeader, CardBody, Button, useDisclosure } from "@heroui/react";
import { ReactNode } from "react";
import CategoryModal from "../common/Modal";
import Habits from "../habits/Habits";


export default function CategoryCard({
  category,
  onDelete,
  children,
}: {
  category: any;
  onDelete: (id: string) => void;
  children?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (

    <>

        <div onClick={onOpen}>   
      <Card
        className="shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
  
      >
        <CardHeader className="flex items-center justify-between">
          <span className="text-xl font-semibold flex items-center gap-2">
            {category.icon || "📂"} {category.name}
          </span>
          <Button
            color="danger"
            size="sm"
            onPress={(e) => {
      
              onDelete(category.id);
            }}
          >
            Delete
          </Button>
        </CardHeader>

        <CardBody>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {category.color || "No color"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </p>
        </CardBody>
      </Card>

      {/* استفاده از کامپوننت مدال */}
      <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} title={category.name}>
         <Habits />
      </CategoryModal>
      </div>
    </>
  );
}

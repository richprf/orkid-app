"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AddCategoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const user = session?.user;

  const { data: getUser } = useQuery({
    queryKey: ["user2"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3001/api/users/${user?.email}`
      );
      return res.data;
    },
  });

  const [form, setForm] = useState({
    name: "",
    color: "",
    icon: "",
  });

const createMutation = useMutation({
  mutationFn: async () => {
    if (!getUser?.id) return;
    const res = await axios.post("http://localhost:3001/api/category", {
      ...form,
      userId: getUser.id, 
    });
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories", getUser?.id] });
    setForm({ name: "", color: "", icon: "" }); 
    onClose();
  },
});

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalBody>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Color"
            type="color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <Input
            label="Icon (e.g.)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="success"
            onPress={() => createMutation.mutate()}
            isLoading={createMutation.isPending}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

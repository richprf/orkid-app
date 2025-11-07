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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddCategoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", color: "", icon: "" });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("http://localhost:3001/api/category", form);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
            label="Icon (e.g. 📚)"
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

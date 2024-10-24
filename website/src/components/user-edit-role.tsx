import { useModal } from "@/hooks/modal";
import { PenIcon } from "./ui/pen";
import { ModalButton } from "./modal-button";
import { Modal } from "./providers/modal";
import { ModalContent } from "./modal-content";
import { Select } from "./ui/select";
import { Form } from "./ui/form";
import { useCallback } from "react";
import { UsersAPI } from "@/api/users";

const ROLES = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "moder",
    label: "Moder",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "banned",
    label: "Banned",
  },
];

export function UserEditRole({
  userId,
  role,
}: {
  userId: number;
  role: UserRole;
}) {
  const { active, handleHide, handleShow } = useModal();
  const submit = useCallback(
    async (formData: FormData) => {
      const newRole = formData.get("role")?.toString() ?? "";
      if (newRole === role) {
        handleHide();
        return;
      }
      await UsersAPI.setRole(userId, newRole as UserRole);
      handleHide();
    },
    [userId, role, handleHide]
  );
  return (
    <Modal active={active} handleHide={handleHide} handleShow={handleShow}>
      <ModalButton
        onClick={handleShow}
        className="text-zinc-500 transition-[color] hover:text-zinc-300"
      >
        <PenIcon />
      </ModalButton>
      <ModalContent>
        <Form
          className="gap-2.5"
          button={(loader, pending) => (
            <menu className="flex items-center gap-2.5 mt-4">
              <button className="text-sm transition-[background-color] bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 rounded-md px-3 h-8 font-medium">
                {pending ? loader : "UPDATE"}
              </button>
              <button
                className="text-sm transition-[background-color] text-red-500 hover:bg-red-500/20 rounded-md px-3 h-8 font-medium"
                type="button"
                onClick={handleHide}
              >
                CANCEL
              </button>
            </menu>
          )}
          submit={submit}
        >
          <span className="text-lg font-medium mb-2.5">Select role</span>
          <Select
            name="role"
            items={ROLES}
            value={ROLES.findIndex((r) => r.value === role)}
          />
        </Form>
      </ModalContent>
    </Modal>
  );
}

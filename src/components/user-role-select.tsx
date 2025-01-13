import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function UserRoleSelect({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="master">Master</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="moder">Moder</SelectItem>
        <SelectItem value="user">User</SelectItem>
      </SelectContent>
    </Select>
  );
}

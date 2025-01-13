"use client";

import { User } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRoleSelect } from "@/components/user-role-select";
import { BannedSelect } from "@/components/banned-select";

export function UsersTable({ users }: { users: User[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-7 gap-4">
        <Input
          placeholder="Find by username"
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="col-span-4"
        />
        <ul className="relative col-span-3 grid grid-cols-2 gap-4">
          <li className="flex items-center gap-2.5">
            <UserRoleSelect
              onValueChange={(role) => {
                table
                  .getColumn("role")
                  ?.setFilterValue(role === "all" ? "" : role);
              }}
            />
          </li>
          <li className="flex items-center gap-2.5">
            <BannedSelect
              onValueChange={(banned) => {
                table.getColumn("banned")?.setFilterValue(banned === "true");
              }}
            />
          </li>
        </ul>
      </div>
      <DataTable table={table} />
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

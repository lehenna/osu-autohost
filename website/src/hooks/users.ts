"use client";
import { UsersAPI } from "@/api/users";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [pending, setPending] = useState(true);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    UsersAPI.find()
      .then((users) => {
        setUsers(users);
        setFilterUsers(users);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);
  const search: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
  }, []);
  useEffect(() => {
    if (query.length < 2) {
      setFilterUsers(users);
      return;
    }
    setFilterUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase().trim())
      )
    );
  }, [users, query]);
  return { users: filterUsers, search, setUsers, pending };
}

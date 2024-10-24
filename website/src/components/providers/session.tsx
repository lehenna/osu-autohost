import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "@/context/session";
import { UsersAPI } from "@/api/users";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(User & { blockRoles: UserRole[] }) | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    UsersAPI.me().then((user) => {
      if (!user) {
        navigate("/api/oauth/authorize");
        return;
      }
      setUser(user);
    });
  }, [navigate]);
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}

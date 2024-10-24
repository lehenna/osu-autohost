import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./routes/layout";
import { ErrorElement } from "./routes/error-element";
import { CreatePage } from "./routes/create/page";
import { GamePage } from "./routes/games/[id]/page";
import { UsersPage } from "./routes/users/page";
import { HomePage } from "./routes/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/games/:id",
        element: <GamePage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

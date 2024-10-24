declare namespace Express {
  interface Request {
    user?: User;
    blockRoles?: UserRole[];
  }
}

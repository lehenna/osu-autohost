export const DEV_MODE = process.env.NODE_ENV === "development";
export const PORT = DEV_MODE ? 4000 : parseInt(process.env.PORT || "5173", 10);

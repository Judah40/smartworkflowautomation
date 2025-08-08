import dotenv from "dotenv";

dotenv.config();
export const jwtTokenSecret = process.env.JWT_SECRET || "defaultSecret";
export const port = process.env.PORT;
export const supabaseUrl = process.env.SUPABASE_API_URL || "default";
export const supabaseServiceRoleKey = process.env.SERVICE_ROLE_KEY || "default";

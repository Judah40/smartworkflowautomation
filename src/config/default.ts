import dotenv from "dotenv";

dotenv.config();
export const jwtTokenSecret = process.env.JWT_SECRET || "defaultSecret";
export const port = process.env.PORT;
export const supabaseUrl = process.env.SUPABASE_API_URL || "default";
export const supabaseServiceRoleKey = process.env.SERVICE_ROLE_KEY || "default";
export const googleClientId = process.env.GOOGLE_CLIENT_ID || "default";
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "default";
export const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || "default";
export const frontEndUrl = process.env.FRONT_END_URL || "http://localhost:3001";
export const githubClientId = process.env.GITHUB_CLIENT_ID || "default";
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || "default";
export const githubCallbackUrl = process.env.GITHUB_CALLBACK_URL || "default";
export const githubStrategy = process.env.GITHUB_STRATEGY || "default";

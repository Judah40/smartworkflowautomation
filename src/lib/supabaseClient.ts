import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "../config/default";

export const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

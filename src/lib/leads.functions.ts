import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  company: z.string().trim().min(2).max(160),
  city: z.string().trim().min(2).max(120),
  people_count: z.coerce.number().int().min(1).max(10000),
  looking_for: z.enum([
    "One laptop",
    "Multiple laptops",
    "Complete workspace",
    "Monitors & peripherals",
    "IT setup",
    "Other",
  ]),
  budget: z.enum([
    "Under ₹25,000",
    "₹25,000–₹50,000",
    "₹50,000–₹1,00,000",
    "₹1,00,000–₹2,50,000",
    "₹2,50,000+",
    "Not sure yet",
  ]),
  requirements: z.string().trim().min(10).max(2000),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert(data);
    if (error) throw new Error("We couldn't save your request. Please try again.");
    return { ok: true };
  });
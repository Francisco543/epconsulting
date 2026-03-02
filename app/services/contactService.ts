import { supabase } from "@/app/lib/supabaseClient";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  created_at: string;
  read_at: string | null;
};

type CreateContactInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

export async function createContactMessage(input: CreateContactInput) {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    subject: input.subject || null,
    message: input.message,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ContactMessage[];
}


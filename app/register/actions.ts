"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signup(formdata: FormData) {
  const supabase = createClient();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log('Error',error);

  if (error || !data?.user) {
    redirect("/error");
  }

  const userData = await supabase.from("user").insert({
    name: formdata.get("name") as string,
    user_id: data.user.id,
  });

  if (userData.error) {
    redirect("/error");
  }

  // Set a cookie to indicate successful registration
  const cookieStore = cookies();
  cookieStore.set('registrationSuccess', 'true', { path: '/' });

  revalidatePath("/", "layout");
  redirect("/registersuccess");
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { formSchema } from "@/utils/validationSchema";

export async function signup(formdata: FormData) {
  const supabase = createClient();

  // フォームデータを抽出してZodでバリデーション
  const result = formSchema.safeParse({
    name: formdata.get("name"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirmPassword: formdata.get("confirmPassword"),
  });

  if (!result.success) {
    // バリデーションエラー処理
    return { error: result.error.errors.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {} as Record<string, string>) };
  }

  const { name, email, password } = result.data;

  // メールアドレスが既に存在するかチェック
  const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single();

  if (existingUser) {
    // メールアドレスが既に存在する場合
    return { error: { email: "このメールアドレスは既に使用されています" } };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data?.user) {
    return { error: { general: "登録中にエラーが発生しました" } };
  }

  const userData = await supabase.from("users").insert({
    name,
    email,
    user_id: data.user.id,
  });

  if (userData.error) {
    return { error: { general: "ユーザー情報の保存中にエラーが発生しました" } };
  }

  // 登録成功を示すクッキーを設定
  const cookieStore = cookies();
  cookieStore.set('registrationSuccess', 'true', { path: '/' });

  revalidatePath("/", "layout");
  return { success: true };
}

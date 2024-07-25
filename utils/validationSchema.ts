import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4, "名前は4文字以上である必要があります").max(20, "名前は20文字以内である必要があります").min(1, "名前を入力してください"),
  email: z.string().email("無効なメールアドレスです").min(1, "メールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります").regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, "パスワードは英字、数字を含める必要があります").min(1, "パスワードを入力してください"),
  confirmPassword: z.string().min(1, "パスワード確認を入力してください"),
}).refine(data => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"], // エラーメッセージを表示するフィールド
});

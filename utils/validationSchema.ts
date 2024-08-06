import { z } from "zod";

// パスワードのバリデーションスキーマ
export const passwordSchema = z.string()
  .min(1, "パスワードを入力してください")
  .min(8, "パスワードは8文字以上である必要があります")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/, // 記号に\W_を追加
    "パスワードは英字、数字、記号を含める必要があります"
  );

// フォーム全体のスキーマ
export const formSchema = z.object({
  name: z.string()
    .min(1, "名前を入力してください")
    .min(4, "名前は4文字以上である必要があります")
    .max(20, "名前は20文字以内である必要があります"),
  
  email: z.string()
    .email("無効なメールアドレスです")
    .min(1, "メールアドレスを入力してください"),
  
  password: passwordSchema, // パスワードスキーマを再利用
  
  confirmPassword: z.string().min(1, "パスワード確認を入力してください"),
}).refine(data => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

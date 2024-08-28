import { cookies } from "next/headers";

export default async function IsLoggedIn() {
  let userInfo;

  try {
    if (!cookies().has("tokens")) return null;
    if (!cookies().has("user_info")) return null;
    userInfo = cookies().get("user_info").value;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }

  return userInfo;
}
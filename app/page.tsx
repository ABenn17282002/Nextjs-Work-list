import Link from "next/link";
import GoogleButton from "./ui/header/GoogleButton";
import IsLoggedIn from "@/app/lib/auth/IsLoggedIn";

export default async function Home() {
  const userInfo = await IsLoggedIn();

  return (    
    <div className="m-2">
      {!userInfo ? <GoogleButton /> : null}
    </div>
  );
}


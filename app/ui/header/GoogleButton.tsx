"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
    const router = useRouter();

    function refreshPage() {
      router.push('/api/auth/google'); 
      router.refresh();
    }
  
    return (
        <button onClick={refreshPage} className="image-container">
        <Image
          src="/web_neutral_sq_SI.svg"
          alt="Google Logo"
          width={200}
          height={200}
          priority 
        />
      </button>
    );
}
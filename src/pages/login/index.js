import LoginPage from "@/features/authentication";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push({ pathname: "/" });
    }
  }, [router]);
  return <LoginPage />;
}

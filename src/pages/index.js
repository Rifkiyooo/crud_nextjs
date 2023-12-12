// pages/index.js
import { useAuth } from "@/hooks/auth"; // Gunakan hook untuk pengecekan otentikasi
import { Loading } from "@/components/loading";
import LoginPage from "@/features/authentication";
import { useRouter } from "next/router";

export default function Home() {
  const { user, loading } = useAuth(); // Dapatkan status otentikasi dari hook
  const route = useRouter();
  // Jika sedang memuat, tampilkan pesan loading
  if (loading) {
    return <Loading />;
  }

  // Jika pengguna belum login, tampilkan halaman login
  if (!user) {
    return <LoginPage />;
  } else {
    route.push("/dashboard");
  }
}

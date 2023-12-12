// hooks/auth.js

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lakukan pengecekan otentikasi di sini
    // Contoh sederhana: cek apakah ada token di localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Jika ada token, tandai pengguna sebagai terotentikasi
      setUser({ username: "Thoriq" }); // Ganti ini dengan data pengguna yang sesuai
    }

    setLoading(false);
  }, []);

  return { user, loading };
}

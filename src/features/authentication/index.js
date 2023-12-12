import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Alert,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "../authentication/login.module.css";

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://doa-api-tan.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Login berhasil
        setLoginStatus("success");

        // Simpan token ke localStorage
        localStorage.setItem("token", data.token);

        // Redirect ke halaman dashboard
        router.reload();
      } else {
        // Login gagal
        setLoginStatus("failure");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("failure");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={80}>
          Welcome to Dashboard MyDoa!
        </Title>

        <TextInput
          label="Username"
          placeholder="Thoriq Fahma"
          size="md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          variant="gradient"
          gradient={{
            from: "rgba(0, 133, 0, 1)",
            to: "rgba(0, 133, 0, 1)",
            deg: 146,
          }}
          fullWidth
          mt="xl"
          size="md"
          onClick={handleLogin}
          className={classes.button}
          ta="center"
        >
          Login
        </Button>

        {loginStatus === "success" && (
          <div className={classes.centered}>
            <Alert
              variant="light"
              color="rgba(0, 71, 17, 1)"
              title="Login Berhasil"
              icon={<IconInfoCircle />}
            >
              Assalamualaikum Wr.Wb. Selamat Datang di Dashboard management
              program MyDoa.
            </Alert>
          </div>
        )}

        {loginStatus === "failure" && (
          <div className={classes.centered}>
            <Alert
              variant="light"
              color="rgba(255, 0, 0, 1)"
              title="Login Gagal"
              icon={<IconInfoCircle />}
            >
              Maaf, login gagal. Silakan coba lagi.
            </Alert>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default LoginPage;

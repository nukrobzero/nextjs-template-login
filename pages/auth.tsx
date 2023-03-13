import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import Input from "@/components/Input";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      return null;
    }
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin",
      });

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    if (!email || !password) {
      return null;
    }
    try {
      await axios.post("/api/register", {
        email,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-zinc-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">
            {variant == "login" ? "Log in" : "Register"}
          </h2>
          <Input
            label="Email"
            onChange={(ev: any) => setEmail(ev.target?.value)}
            id="email"
            type="email"
            value={email}
          />
          <br />
          <Input
            label="Password"
            onChange={(ev: any) => setPassword(ev.target?.value)}
            id="password"
            type="password"
            value={password}
          />
          <button
            onClick={variant == "login" ? login : register}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 w-full border border-blue-700 rounded"
          >
            {variant == "login" ? "Login" : "Register"}
          </button>
          <p
            className="hover:underline cursor-pointer text-end mt-2"
            onClick={toggleVariant}
          >
            {variant == "login" ? "Create an account" : "Have account? Login"}
          </p>
          <div className="mt-10 font-bold">
            <p>{variant == "login" ? "Other Login" : "Other Register"}</p>
          </div>
          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div
              onClick={() => signIn("google", { callbackUrl: "admin" })}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const router = useRouter();
  const [mode, setMode] = useState<string | null>('login');

  useEffect(() => {
    if (router.isReady && router.query.mode) {
      setMode(router.query.mode as string); // Set the mode from query params
    }
  }, [router.isReady, router.query]);

  if (!mode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-black" >Welcome Back!</h2>
      <AuthForm mode={mode as "login" | "signup"} />
    </div>
  );
};

export default AuthPage;

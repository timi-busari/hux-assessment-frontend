import Image from "next/image";
import localFont from "next/font/local";
import { useEffect } from "react";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("token")); // check for token in localStorage

    if (isLoggedIn) {
      router.push("/contacts"); // redirect logged-in users to Contacts
    }
  }, [router]);

  const handleLogin = () => {
    router.push("/auth?mode=login"); // navigate to auth page for login
  };

  const handleSignUp = () => {
    router.push("/auth?mode=signup"); // navigate to auth page for signup
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} bg-gray-50`}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image
          className="dark" 
          src="/contacts.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Contact App
          </h1>
          <p className="text-gray-600 mb-6">
            This app allows you to manage your contacts efficiently.
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 "
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

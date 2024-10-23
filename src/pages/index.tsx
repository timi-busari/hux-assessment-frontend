import Image from "next/image";
import localFont from "next/font/local";

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
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} `}>
      <div className="center flex flex-col items-center justify-center min-h-screen py-2">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div>
          <h1 className="text-3xl font-bold">Welcome to the Contact App</h1>
          <p>This app allows you to manage your contacts efficiently.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@mui/material";
import "./globals.css";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/register");
  };
  return (
    <html lang="en">
      <head>
        <title>Home | Carefinder</title>
      </head>
      <body>
        <main className="home-container">
          <div className="hero-banner text-center">
            <h1 className="font-bold text-5xl p-6 text-blue-800">
              Find the perfect hospital in your region
            </h1>
            <p className="text-base">
              Join us today to discover the best hospitals 🏥 near you. Quick
              and easy sign-up process.
            </p>
            <div className="mt-12">
              <Button variant="contained" onClick={handleRedirect}>
                Sign up
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default Home;

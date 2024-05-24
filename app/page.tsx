import Login from "@/components/auth/Login";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
export default function Home() {
  return (
    <>
      <main className=" flex h-full  gap-3 dark-bg flex-col items-center justify-center">
        <h1
          className={cn(
            "font-semibold text-6xl text-slate-100 drop-shadow-md",
            font.className
          )}>
          🔐Auth
        </h1>
        <p className=" text-slate-100 text-lg">
          A simple authentication service
        </p>
        <Login>
          <Button variant="secondary" size={"lg"} color="bg-slate-600">
            Signin
          </Button>
        </Login>
      </main>
    </>
  );
}

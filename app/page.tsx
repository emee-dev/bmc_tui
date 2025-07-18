"use client";

import { Box, BoxBadge } from "@/components/tui/box";
import { Button } from "@/components/tui/button";
import { Cookie } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [creator, setCreator] = useState("");

  return (
    <main className="w-screen h-full" data-webtui-theme="catppuccin-mocha">
      {/* Headers */}
      <section className="w-full flex h-[15ch] items-center justify-between px-[10lh]">
        <div className=" flex items-center gap-x-2">
          <Cookie className="size-4" />
          <span>Buymeacoffee</span>
        </div>

        <div className="flex items-center gap-x-3">
          <Box
            box="square"
            shear="both"
            className="h-[7.4ch] items-center justify-center w-[35ch]"
          >
            <BoxBadge is="badge" variant="background0">
              Search creators
            </BoxBadge>
            <div className="w-full my-auto mt-0.5 px-2">
              <input
                placeholder="..."
                className="w-full"
                value={creator}
                autoCorrect="off"
                autoComplete="off"
                onChange={(e) => setCreator(e.target.value)}
                onKeyDown={(e) => {
                  let key = e.code;

                  if (key === "Enter") {
                    console.log(e.code);

                    router.push(`/s/${creator}`);
                  }
                }}
              />
            </div>
          </Box>

          <div className="flex gap-x-2">
            <Link href="/login">
              <Button variant="background1" className=" w-16 p-0">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero */}
      <Box
        className="mt-[7%] h-[37ch] flex flex-col mx-[10%]"
        box="square"
        shear="both"
      >
        <div className="translate-x-3">
          <BoxBadge is="badge" variant="background0">
            Hero
          </BoxBadge>
        </div>
        <div className="mx-auto flex items-center gap-x-2 mt-[0.5lh]">
          <span is-="spinner" variant-="dots"></span>
          <span>Made for devs</span>
          <span is-="spinner" variant-="dots" direction-="reverse"></span>
        </div>
        <div className="mx-auto flex items-center flex-col gap-x-2 mt-[1lh]">
          <span className="text-6xl">Fund your</span>
          <span className="text-6xl">creative work</span>

          <blockquote className="mt-[1lh]">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </blockquote>
        </div>

        <div className="mx-auto mt-[0.5lh]">
          <Link href="/user">
            <Button>Get started</Button>
          </Link>
        </div>
      </Box>
    </main>
  );
}

export default Page;

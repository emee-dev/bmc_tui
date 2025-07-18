"use client";

import { Box, BoxBadge } from "@/components/tui/box";
import { Button } from "@/components/tui/button";
import { Cookie } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main
      className="w-screen h-full select-none"
      data-webtui-theme="catppuccin-mocha"
    >
      <section className="w-full flex h-[15ch] items-center justify-between px-[10lh]">
        <div className=" flex items-center gap-x-2">
          <Cookie className="size-4" />
          <span>Buymeacoffee</span>
        </div>

        <div className="flex items-center gap-x-3">
          <div className="flex gap-x-2">
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 w-[70%] place-items-center mx-auto">
        <Box
          box="square"
          shear="both"
          className="h-[40ch] items-center justify-center w-full"
        >
          <div className="translate-x-3">
            <BoxBadge is="badge" variant="background0">
              Login
            </BoxBadge>
          </div>
          <div className="w-[98%] mt-[2ch] mx-auto h-[88%] px-2 flex flex-col gap-y-[1lh]">
            <label box-="round" shear-="top" className="h-fit">
              <div className="flex">
                <span is-="badge" variant-="background0">
                  Firstname
                </span>
              </div>
              <div className="px-[0.5ch]">
                <input placeholder="Your firstName" className="w-full" />
              </div>
            </label>

            <div className="flex items-center gap-x-[1.5ch]">
              <Link href="/user" className="ml-auto">
                <Button>Submit</Button>
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </main>
  );
};

export default LoginPage;

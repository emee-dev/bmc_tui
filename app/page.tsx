"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/tui/button";
import { Cookie } from "lucide-react";

function Page() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const presetAmounts = [3, 5, 10, 25, 50];
  const recentDonations = [
    {
      name: "Anonymous",
      amount: 5,
      message: "Keep up the great work!",
      time: "2m ago",
    },
    {
      name: "Sarah",
      amount: 10,
      message: "Love your content!",
      time: "1h ago",
    },
    { name: "Mike", amount: 3, message: "", time: "3h ago" },
    {
      name: "Anonymous",
      amount: 25,
      message: "Thanks for the tutorials",
      time: "1d ago",
    },
  ];

  const handleDonate = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowDialog(false);
    window.location.href = "/thank-you";
  };

  return (
    <main className="w-screen h-full" data-webtui-theme="catppuccin-mocha">
      {/* Headers */}
      <section className="w-full flex h-[15ch] items-center justify-between px-[10lh]">
        <div className=" flex items-center gap-x-2">
          <Cookie className="size-4" />
          <span>Buymeacoffee</span>
        </div>

        <div className="flex items-center gap-x-3">
          <div
            box-="square"
            shear-="both"
            className="h-[7.4ch] items-center justify-center w-[35ch]"
          >
            <div>
              <span is-="badge" variant-="background0">
                Search creators
              </span>
            </div>
            <div className="w-full my-auto mt-0.5 px-2">
              <input placeholder=".." className="w-full" />
            </div>
          </div>

          <div className="flex gap-x-2">
            <Button variant="background1" className=" w-16 p-0">
              Login
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </section>

      {/* Hero */}
      <div
        className="mt-[7%] h-[37ch] flex flex-col mx-[10%]"
        box-="square"
        shear-="both"
      >
        <div className="translate-x-3">
          <span is-="badge" variant-="background0">
            Hero
          </span>
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
          <Button>Get started</Button>
        </div>
      </div>
    </main>
  );
}

export default Page;

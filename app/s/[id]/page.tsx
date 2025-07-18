"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/tui/button";
import {
  Cookie,
  ExternalLink,
  Github,
  Info,
  Menu,
  Pizza,
  Settings2,
  Twitter,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/tui/dialog";
import { Box, BoxBadge } from "@/components/tui/box";
import { fakeImage } from "@/lib/utils";

type User = {
  firstName: string;
  bmcHandle: string;
  twitter: string;
  github: string;
};

const Page = () => {
  const [isShareOpen, setShareOpen] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: "Emmanuel",
    bmcHandle: "https://coff.ee/emee_dev",
    twitter: "https://x.com/___emee_",
    github: "https://github.com/emee-dev",
  });

  return (
    <main
      className="w-screen h-full select-none"
      data-webtui-theme="catppuccin-mocha"
    >
      <section className="w-full flex h-[15ch] items-center justify-between mx-auto  px-[10lh]">
        <div className="flex items-center gap-x-2">
          <Image
            src={fakeImage("emee_dev", {
              size: "65x65",
            })}
            alt="user avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{user.firstName}</span>
        </div>

        <div className="flex items-center gap-x-3  w-fit">
          <Dialog open={isShareOpen} onOpenChange={(e) => setShareOpen(e)}>
            <DialogTrigger variant="background1" className="w-[5ch]">
              <Upload className="size-5" />
            </DialogTrigger>

            <DialogContent box="double" className="w-full">
              <DialogTitle>{`Share ${user.firstName}'s Page`}</DialogTitle>
              <DialogDescription>
                This is also a form support.
              </DialogDescription>

              <div className="flex gap-4 justify-end">
                <Button onClick={() => setShareOpen(false)}>Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex gap-x-2">
            <Button>
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard separator */}
      <div className="grid grid-cols-2 w-[70%] place-items-center mx-auto">
        <PageDescription user={user} />
        <PageDonation />
      </div>
    </main>
  );
};

const PageDescription = ({ user }: { user: User }) => {
  return (
    <Box
      box="square"
      shear="both"
      className="h-[45ch] items-center justify-center w-full"
    >
      <div className="translate-x-3">
        <BoxBadge is="badge" variant="background0">
          About
        </BoxBadge>
      </div>
      <div className="w-[98%] mt-[2ch] mx-auto h-[88%] px-2 flex flex-col gap-y-[1lh]">
        <p className="text-[2ch]">
          <code>Building Http</code>
        </p>

        <p className="text-[1.7ch]">
          Currently, I'm focused on developing the best HTTP client for API
          development. Looking ahead, I envision myself leading a team of
          engineers to create a top-tier HTTP client that rivals existing
          alternatives.
        </p>

        <div className="flex items-center gap-x-[1.5ch]">
          <Link href={user.github}>
            <Github className="size-5 text-gray-700" />
          </Link>
          <Link href={user.twitter}>
            <Twitter className="size-5 text-gray-700" />
          </Link>
        </div>
        <div className="flex items-center gap-x-[1.5ch]">
          <p>Recent Supporters</p>
        </div>
      </div>
    </Box>
  );
};

type Price = { id: number; price: number };

const initialPrices = [
  {
    id: 1,
    price: 1,
  },
  {
    id: 2,
    price: 5,
  },
  {
    id: 3,
    price: 10,
  },
];

const PageDonation = () => {
  const [selectedPrice, setSelectedPrice] = useState<Price | null>();
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [prices, setPrices] = useState<Price[]>(initialPrices);

  useEffect(() => {
    setSelectedPrice(initialPrices[0]);
  }, []);

  return (
    <Box
      box="square"
      shear="both"
      className="h-[45ch] items-center justify-center w-full"
    >
      <div className="translate-x-3">
        <BoxBadge is="badge" variant="background0">
          Donate
        </BoxBadge>
      </div>
      <div className="w-[98%] mt-[2ch] mx-auto h-[88%] px-[0.2lh] flex flex-col gap-y-[0.8lh]">
        <div className="text-[2ch] px-[0.2lh] flex items-center">
          <p>
            Buy <code>Emmanuel</code> a pizza
          </p>
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4 ml-[0.6ch]" />
            </TooltipTrigger>
            <TooltipContent
              position="top right"
              className="bg-[var(--foreground0)] rounded-sm text-center"
            >
              <p className=" text-black text-[0.7lh] w-[200px]">
                It's a friendly metaphor, not real pizza. Each "pizza" is $5 and
                you can buy as many you like.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div
          box-="square"
          className="w-full h-[5lh] items-center flex justify-center gap-x-3"
        >
          <Pizza className="size-10" />
          <X className="size-5 text-gray-700 w-[3.5ch]" />
          <div className="flex items-center gap-x-3">
            {prices.map((item) => (
              <Button
                className="w-[10ch]"
                key={item.id}
                variant={
                  selectedPrice?.id === item.id ? "foreground0" : "background0"
                }
                onClick={() => setSelectedPrice(item)}
              >
                {item.price}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-[0.2lh]">
          <input placeholder="Name or @handle" className="h-[2.5lh] w-full" />
        </div>
        <div className="px-[0.2lh] flex flex-col gap-y-[1ch] mt-[1.3ch]">
          <label>
            <input
              type="checkbox"
              checked={isMonthly}
              onChange={(value) => setIsMonthly(value.currentTarget.checked)}
            />
            Make this monthly
          </label>
          {selectedPrice && (
            <Button className="w-full">
              Support ${selectedPrice.price}
              {isMonthly ? "/month" : ""}
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Page;

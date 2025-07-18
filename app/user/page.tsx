"use client";

import { Box, BoxBadge } from "@/components/tui/box";
import { Button } from "@/components/tui/button";
import { useSimulatedDonors } from "@/hooks/use-donor";
import {
  FakeUserData,
  STORAGE_KEY,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import { fakeImage, wait } from "@/lib/utils";
import { Cookie, ExternalLink, Settings, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatorSetupPage() {
  const router = useRouter();
  const { donors, totalAmt } = useSimulatedDonors(30);
  const { value, get } = useLocalStorage<FakeUserData | null>(
    STORAGE_KEY.USER_DATA
  );

  return (
    <main className="w-screen h-full" data-webtui-theme="catppuccin-mocha">
      <section className="w-full flex h-[15ch] items-center justify-between mx-auto  px-[10lh]">
        <div className="flex items-center gap-x-2">
          <Cookie className="size-4" />
          <span>Buymeacoffee</span>
        </div>

        <div className="flex items-center gap-x-3  w-fit">
          <Link href={`/s/${value?.firstName}`}>
            <Button variant="background1">
              <ExternalLink className="size-5" /> Goto Page
            </Button>
          </Link>

          <div className="flex gap-x-2">
            <Button>
              <Settings className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard separator */}

      {!value && (
        <Box
          box="square"
          shear="both"
          className="h-[15ch] items-center justify-center w-[70%] mx-auto"
        >
          <div className="translate-x-3">
            <BoxBadge is="badge" variant="background0">
              Dashboard
            </BoxBadge>
          </div>

          <div className="w-[98%] mx-auto h-[88%] px-[1.3ch] flex items-center gap-x-[2lh] justify-center">
            Invalid user account
            <Link href="/sign-up">
              <Button>Register</Button>
            </Link>
          </div>
        </Box>
      )}

      {value && (
        <>
          <Box
            box="square"
            shear="both"
            className="h-[40ch] items-center justify-center w-[70%] mx-auto"
          >
            <div className="translate-x-3">
              <BoxBadge is="badge" variant="background0">
                Dashboard
              </BoxBadge>
            </div>
            <div className="w-[98%] mx-auto h-[88%] px-[1.3ch]">
              <div className="mt-[3ch] flex w-full justify-between px-[1.3ch]">
                <div className="flex gap-x-[2ch] ">
                  <Image
                    src={fakeImage("emee_dev", {
                      size: "65x65",
                    })}
                    alt="user avatar"
                    width={65}
                    height={65}
                    className="rounded-full"
                  />

                  <div className="h-full flex flex-col">
                    <p className="text-[4ch]">Hi, {value?.firstName}</p>
                    <p className="mt-auto">{value?.bmcHandle}</p>
                  </div>
                </div>

                <Button variant="background1">
                  <Upload className="size-5" /> Share page
                </Button>
              </div>
              <div className="mt-[8ch] px-[1.3ch]">
                <p className="text-[2.5ch]">Earnings</p>
                <p className="text-[4ch] mt-[0.3ch]">${totalAmt}</p>

                <div className="mt-[3.5ch] flex items-center justify-between">
                  <blockquote className="flex items-center">
                    <p className="text-[2ch]">$0 Supporters</p>
                  </blockquote>
                  <blockquote className="flex items-center">
                    <p className="text-[2ch]">$0 Membership</p>
                  </blockquote>
                  <blockquote className="flex items-center">
                    <p className="text-[2ch]">$0 Shop</p>
                  </blockquote>
                </div>
              </div>
            </div>
          </Box>

          <Box
            box="square"
            shear="both"
            className="h-[40ch] items-center justify-center w-[70%] mx-auto"
          >
            <div className="translate-x-3">
              <BoxBadge is="badge" variant="background0">
                Donations
              </BoxBadge>
            </div>
            <div className="w-[98%] mx-auto h-[88%] px-[1.3ch] flex gap-x-[1.5ch]">
              <div className="mt-3 overflow-scroll h-[95%] w-1/2">
                <ul marker-="open tree open">
                  {donors.map((donor) => (
                    <li key={donor.id}>
                      {donor.name}{" "}
                      <span className="text-gray-400">
                        {donor.type === "bought"
                          ? `bought ${donor.amount} ${
                              donor.amount > 1 ? "coffees" : "coffee"
                            }`
                          : `donated $${donor.amount.toFixed(2)}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 overflow-scroll h-[95%] w-1/2">
                <ul marker-="open tree open">
                  {Array.from({ length: 50 })
                    .fill(null)
                    .map((item, index) => (
                      <li key={index}>
                        Anonymous{" "}
                        <span className="text-gray-400">"bought"</span> a coffee
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </Box>
        </>
      )}
    </main>
  );
}

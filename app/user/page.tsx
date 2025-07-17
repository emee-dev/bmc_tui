"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/tui/button";
import { Cookie, Menu, Settings2, Upload } from "lucide-react";
import Image from "next/image";

export default function CreatorSetupPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    displayName: "johndoe",
    description:
      "Full Stack Developer building open source tools and sharing knowledge about web development.",
    avatarUrl: "",
    paymentHandle: "john.doe@example.com",
    publicDonations: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const donations = [];

  return (
    <main className="w-screen h-full" data-webtui-theme="catppuccin-mocha">
      <section className="w-full flex h-[15ch] items-center justify-between mx-auto  px-[10lh]">
        <div className="flex items-center gap-x-2">
          <Cookie className="size-4" />
          <span>Buymeacoffee</span>
        </div>

        <div className="flex items-center gap-x-3  w-fit">
          {/* <div
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
          </div> */}
          <Button variant="background1">
            <Settings2 className="size-5" /> Page Settings
          </Button>

          <div className="flex gap-x-2">
            <Button>
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard separator */}

      <div
        box-="square"
        shear-="both"
        className="h-[40ch] items-center justify-center w-[70%] mx-auto"
      >
        <div className="translate-x-3">
          <span is-="badge" variant-="background0">
            Dashboard
          </span>
        </div>
        <div className="w-[98%] mx-auto h-[88%] px-2 ">
          {/* Image */}
          {/* <div className="mt-[3ch] flex gap-x-[2ch]">
            <Image
              src="/placeholder.jpg"
              alt="user avatar"
              width={65}
              height={65}
              className="rounded-full"
            />

            <div className="h-full flex flex-col">
              <p className="text-[4ch]">Hi, Emmanuel</p>
              <p className="mt-auto">coff.ee/emee_dev</p>
            </div>
          </div> */}
          <div className="mt-[3ch] flex w-full justify-between px-[1.3ch]">
            <div className="flex gap-x-[2ch] ">
              <Image
                src="/placeholder.jpg"
                alt="user avatar"
                width={65}
                height={65}
                className="rounded-full"
              />

              <div className="h-full flex flex-col">
                <p className="text-[4ch]">Hi, Emmanuel</p>
                <p className="mt-auto">coff.ee/emee_dev</p>
              </div>
            </div>

            <Button variant="background1">
              <Upload className="size-5" /> Share page
            </Button>
          </div>
          <div className="mt-[8ch] px-[1.3ch]">
            <p className="text-[2.5ch]">Earnings</p>
            <p className="text-[4ch] mt-[0.3ch]">$0</p>

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
      </div>

      <div
        box-="square"
        shear-="both"
        className="h-[40ch] items-center justify-center w-[70%] mx-auto"
      >
        <div className="translate-x-3">
          <span is-="badge" variant-="background0">
            Donations
          </span>
        </div>
        <div className="w-[98%] mx-auto h-[88%] px-2 flex gap-x-[1.5ch]">
          <div className="mt-3 overflow-scroll h-[95%] w-1/2">
            <ul marker-="open tree open">
              <li>
                James <span className="text-gray-400">"donated"</span> $100
              </li>
              <li>
                Anonymous <span className="text-gray-400">"bought"</span> a
                coffee
              </li>

              {Array.from({ length: 50 })
                .fill(null)
                .map((item) => (
                  <li>
                    Anonymous <span className="text-gray-400">"bought"</span> a
                    coffee
                  </li>
                ))}

              <li>
                <code>marker-="tree open"</code>
              </li>
            </ul>
          </div>
          <div className="mt-3 overflow-scroll h-[95%] w-1/2">
            <ul marker-="open tree open">
              <li>
                James <span className="text-gray-400">"donated"</span> $100
              </li>
              <li>
                Anonymous <span className="text-gray-400">"bought"</span> a
                coffee
              </li>

              {Array.from({ length: 50 })
                .fill(null)
                .map((item) => (
                  <li>
                    Anonymous <span className="text-gray-400">"bought"</span> a
                    coffee
                  </li>
                ))}

              <li>
                <code>marker-="tree open"</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { Box, BoxBadge } from "@/components/tui/box";
import { Button } from "@/components/tui/button";
import {
  FakeUserData,
  STORAGE_KEY,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import { wait } from "@/lib/utils";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const { value, set, get } = useLocalStorage<FakeUserData | null>(
    STORAGE_KEY.USER_DATA
  );
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FakeUserData>({
    firstName: "Emmanuel",
    bmcHandle: "coff.ee/emee_dev",
    twitter: "https://x.com/___emee_",
    github: "https://github.com/emee-dev",
    about:
      "Currently, I'm focused on developing the best HTTP client for API development. Looking ahead, I envision myself leading a team of engineers to create a top-tier HTTP client that rivals existing alternatives.",
  });

  useEffect(() => {
    if (isLoading === false) return;

    const submit = async () => {
      await wait(2000);

      set(user);

      router.push("/user");
      setIsLoading(false);
    };

    submit();
  }, [isLoading, user]);

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
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 w-[70%] place-items-center mx-auto">
        <Box
          box="square"
          shear="both"
          className="h-[55ch] items-center justify-center w-full"
        >
          <div className="translate-x-3">
            <BoxBadge is="badge" variant="background0">
              Registration
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
                <input
                  placeholder="Your firstName"
                  className="w-full"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
            </label>
            <label box-="round" shear-="top" className="h-fit">
              <div className="flex">
                <span is-="badge" variant-="background0">
                  About
                </span>
              </div>
              <div className="px-[0.5ch]">
                <textarea
                  size-="large"
                  placeholder="what is your page all about?"
                  className="w-full mt-[0.5ch]"
                  value={user.about}
                  onChange={(e) => setUser({ ...user, about: e.target.value })}
                />
              </div>
            </label>

            <div className="grid grid-cols-3">
              <label box-="round" shear-="top" className="h-fit">
                <div className="flex">
                  <span is-="badge" variant-="background0">
                    Github
                  </span>
                </div>
                <div className="px-[0.5ch]">
                  <input
                    placeholder="Github profile link"
                    className="w-full "
                    value={user.github}
                    onChange={(e) =>
                      setUser({ ...user, github: e.target.value })
                    }
                  />
                </div>
              </label>
              <label box-="round" shear-="top" className="h-fit">
                <div className="flex">
                  <span is-="badge" variant-="background0">
                    Twitter
                  </span>
                </div>
                <div className="px-[0.5ch]">
                  <input
                    placeholder="Your twitter link"
                    className="w-full "
                    value={user.twitter}
                    onChange={(e) =>
                      setUser({ ...user, twitter: e.target.value })
                    }
                  />
                </div>
              </label>
              <label box-="round" shear-="top" className="h-fit">
                <div className="flex">
                  <span is-="badge" variant-="background0">
                    BMC tag
                  </span>
                </div>
                <div className="px-[0.5ch]">
                  <input
                    placeholder="Your BMC tag"
                    className="w-full "
                    value={user.bmcHandle}
                    onChange={(e) =>
                      setUser({ ...user, bmcHandle: e.target.value })
                    }
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center gap-x-[1.5ch] mt-auto">
              {!isLoading && (
                <Button
                  className="ml-auto w-[3.5lh]"
                  onClick={() => setIsLoading(true)}
                >
                  Submit
                </Button>
              )}

              {isLoading && (
                <Button
                  disabled
                  className="ml-auto flex items-center"
                  onClick={() => console.log("User: ", user)}
                >
                  Submitting
                  <span is-="spinner" variant-="dots"></span>
                </Button>
              )}
            </div>
          </div>
        </Box>
      </div>
    </main>
  );
};

export default SignupPage;

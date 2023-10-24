"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useRef, useState } from "react";

import { FaRedo } from "react-icons/fa";

import { BiShow, BiHide } from "react-icons/bi";
export default function Home() {
  const [password, setPassword] = useState<string | undefined>();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [length, setLength] = useState<number>(30);

  function toggleInputType() {
    setIsShowing(!isShowing);
  }
  function generate() {
    const buffer = new Uint8Array(length);
    const crypto = window.crypto;
    const array = crypto.getRandomValues(buffer);
    let password = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(array[i] % characters.length);
    }
    setPassword(password);
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div className="w-[350px] h-[400px] rounded-sm">
        <div className="flex py-2 w-full justify-center flex-col">
          <div className="flex px-2">
            <Input
              type={isShowing ? "text" : "password"}
              className="rounded"
              defaultValue={password}
            />
            <Button onClick={generate}>
              <FaRedo />
            </Button>
          </div>
          <div className="w-full border-b border-white my-2"></div>
          <div className="flex  items-center ">
            <Input
              type="range"
              name="password"
              min={0}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <span className="px-2">{length}</span>
          </div>
          <div className="flex items-center justify-end w-full">
            <Button className="w-[25px] h-[25px] p-0" onClick={toggleInputType}>
              {isShowing ? (
                <BiHide className="w-full h-full" />
              ) : (
                <BiShow className="w-full h-full" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

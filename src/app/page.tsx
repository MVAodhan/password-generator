"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { FaRedo } from "react-icons/fa";

export default function Home() {
  const [password, setPassword] = useState<string | undefined>();
  const [inputType, setInputType] = useState<"text" | "password">("text");
  const [length, setLength] = useState<number>(30);
  async function generate() {
    const buffer = new Uint8Array(length);
    const crypto = window.crypto;
    const array = crypto.getRandomValues(buffer);
    let password = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(array[i] % characters.length);
    }
    setPassword(password);
  }
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div className="w-[350px] h-[400px] rounded-sm">
        <div className="flex py-2 w-full justify-center flex-col">
          <div className="flex px-2">
            <Input
              type={inputType}
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
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span className="px-2">{length}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

import React from "react";
import { PackCard, TPack } from "./PackCard";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

async function getPacks(): Promise<TPack[]> {
  const res = await axios.get(`${BACKEND_URL}/ai/pack/bulk`);
  return res.data.packs ?? [];
}
export const Packs = async () => {
  const packs = await getPacks();
  return (
    <div>
      {packs.map((pack) => (
        <PackCard key={pack.name} {...pack} />
      ))}
    </div>
  );
};

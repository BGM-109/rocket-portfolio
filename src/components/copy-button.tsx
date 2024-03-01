"use client";

import { Copy } from "lucide-react";

export function CopyButton({ json }: { json: string }) {
  function copyJson() {
    navigator.clipboard.writeText(json);
    alert("Copied to clipboard");
  }
  return (
    <Copy
      size={20}
      className="text-[#5d615e] cursor-pointer self-end m-2"
      onClick={copyJson}
    />
  );
}

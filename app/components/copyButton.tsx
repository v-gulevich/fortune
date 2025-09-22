"use client";

export default function CopyButton() {
  return (
    <button
      onClick={() =>
        navigator.clipboard.writeText(
          "3HzDiiwVXYxPnvFUmLL5TKhrYmMPrL235PTi1YmGBVyD"
        )
      }
      className="font-mono font-semibold hover:cursor-pointer hover:underline hover:text-blue-700"
    >
      [ Copy Address ]
    </button>
  );
}

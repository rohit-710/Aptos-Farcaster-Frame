import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Mint an NFT on Aptos",
      action: "post",
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/default.png`,
    aspectRatio: "1.91:1",
  },
  input: {
    text: "enter...",
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "Mint an NFT on Aptos",
  description: "Mint an NFT on Aptos",
  openGraph: {
    title: "Mint an NFT on Aptos",
    description: "Enter your Aptos Wallet address to Mint an NFT on Aptos",
    images: [`${NEXT_PUBLIC_URL}/default.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Mint an NFT</h1>
    </>
  );
}

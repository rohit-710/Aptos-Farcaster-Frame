import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let input: string | undefined = "";
  let recipientAddress = "";
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
  const body: FrameRequest = await req.json();
  const env = process.env.CROSSMINT_ENV || "www";
  const hash = "";

  try {
    const { message } = await getFrameMessage(body, {
      neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    if (message?.input) {
      input = message.input;
    }

    if (!input) {
      return new NextResponse(
        getFrameHtmlResponse({
          image: {
            src: `${NEXT_PUBLIC_URL}/error2.png`,
          },
          ogTitle: "Error",
        })
      );
    }

    if (process.env.WARPCAST_HASH && process.env.NEYNAR_API_KEY) {
      const neynarURL = `https://api.neynar.com/v2/farcaster/cast?identifier=${process.env.WARPCAST_HASH}&type=hash`;

      const neynarResponse = await fetch(neynarURL, {
        headers: {
          api_key: process.env.NEYNAR_API_KEY,
          "content-type": "application/json",
        },
        method: "GET",
      });

      const data = await neynarResponse.json();

      const reactions = await data.cast.reactions;

      const hasRecasted = reactions.recasts.some(
        (recast: { fid: Number }) => recast.fid === message?.interactor.fid
      );
      const hasLiked = reactions.likes.some(
        (likes: { fid: Number }) => likes.fid === message?.interactor.fid
      );

      if (!hasRecasted || !hasLiked) {
        return new NextResponse(
          getFrameHtmlResponse({
            image: {
              src: `${NEXT_PUBLIC_URL}/error1.png`,
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
            buttons: [
              {
                label: "Please try again",
                action: "post",
              },
            ],
          })
        );
      }
    }

    recipientAddress = `aptos:${input}`;

    const crossmintURL = `https://${env}.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts`;
    const crossmintOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": process.env.CROSSMINT_API_KEY!,
      },
      body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
          name: "The First Frame NFT on Aptos",
          image: `${NEXT_PUBLIC_URL}/nft.png`,
          description:
            "This is the first NFT that was minted on Aptos using Crossmint",
        },
      }),
    };

    const response = await fetch(crossmintURL, crossmintOptions);
    await response.json();

    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${NEXT_PUBLIC_URL}/success.png`,
        },
        buttons: [
          {
            label:
              "Your NFT will be delivered to your Aptos wallet address soon!",
          },
        ],
      })
    );
  } catch (error) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${NEXT_PUBLIC_URL}/error.png`,
        },
        ogTitle: "Error",
      })
    );
  }
}

export const dynamic = "force-dynamic";

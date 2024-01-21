import { App } from "@slack/bolt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Slack App の初期化
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      // Slack メッセージの送信
      const result = await slackApp.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: "your-channel-id",
        text: "Hello, world!",
      });

      return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "メッセージの送信に失敗しました。" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    return new NextResponse(null, { status: 405 });
  }
}

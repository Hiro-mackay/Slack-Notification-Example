import { App } from "@slack/bolt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || "";

// Slack App の初期化
const slackApp = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
});

export async function POST(req: NextRequest) {
  console.log("Called POST /api/slack/send-message");

  const { task } = await req.json();

  try {
    if (!task) {
      throw new Error("Not Found Task!!");
    }

    console.log("task: ", task);
    // Slack メッセージの送信
    const result = await slackApp.client.chat.postMessage({
      channel: SLACK_CHANNEL,
      text: task,
    });

    console.log("send message:", result);

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
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
}

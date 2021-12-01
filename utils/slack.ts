import { App, LogLevel, Block, KnownBlock } from "@slack/bolt";
import { Member } from "./types";

const ADVENT_YEAR = process.env.ADVENT_YEAR;

const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG,
});

type PublishMessageProps = {
  blocks: (Block | KnownBlock)[];
  text: string;
};

export const publishMessage = ({ blocks, text }: PublishMessageProps) =>
  bot.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: "#advent",
    blocks: blocks,
    text: text,
  });

export const getMedal = (index: number) => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
};

export const createSlackLeaderboardBlocks = (members: Member[]) => {
  const formattedScores = members.map((data, i) => ({
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `${getMedal(i)} ${getOrdinal(i)}\n*User:* ${data.name}`,
      },
      {
        type: "mrkdwn",
        text: `*Score:* ${data.local_score}\n*Stars:* ${data.stars}`,
      },
    ],
  }));

  const slackBlocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Advent ${ADVENT_YEAR} High Scores`,
        emoji: true,
      },
    },
    ...formattedScores,
  ];

  return slackBlocks;
};

export const getOrdinal = (index: number) => {
  switch (index) {
    case 0:
      return "1st";
    case 1:
      return "2nd";
    case 2:
      return "3rd";
    default:
      return `${index + 1}th`;
  }
};

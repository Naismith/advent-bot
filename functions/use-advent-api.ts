import { Handler } from "@netlify/functions";
import { publishMessage, createSlackLeaderboardBlocks } from "../utils/slack";
import { getTopTenMembers } from "../utils/advent";

// Environment Variables declared in netlify secrets
const ADVENT_YEAR = process.env.ADVENT_YEAR;
const SERVER_SECRET = process.env.SERVER_SECRET;

const handler: Handler = async (event, context) => {
  const secret = event.headers["x-advent-server-secret"];

  // Check to see if header passed in matches server secret.
  if (secret !== SERVER_SECRET) {
    return {
      statusCode: 401,
    };
  }

  // Reaches out to Advent API, and will grab top 10 members
  const members = await getTopTenMembers();

  // Creates slack blocks to make a formatted message to send to slack channel
  const slackBlocks = createSlackLeaderboardBlocks(members);

  // Sends formatted message to slack channel
  await publishMessage({
    blocks: slackBlocks,
    text: `Advent of Code ${ADVENT_YEAR} High Scores`,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };
};

export { handler };

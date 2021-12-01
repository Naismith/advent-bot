import axios from "axios";
import { Leaderboard } from "./types";

const ADVENT_YEAR = process.env.ADVENT_YEAR;
const ADVENT_LEADERBOARD_ID = process.env.ADVENT_LEADERBOARD_ID;
const ADVENT_SESSION_KEY = process.env.ADVENT_SESSION_KEY;

export const getLeaderboard = () => {
  const URL = `https://adventofcode.com/${ADVENT_YEAR}/leaderboard/private/view/${ADVENT_LEADERBOARD_ID}.json`;

  return axios.get<Leaderboard>(URL, {
    headers: {
      cookie: `session=${ADVENT_SESSION_KEY}`,
    },
  });
};

export const getTopTenMembers = async () => {
  const { data } = await getLeaderboard();

  const ordered = Object.values(data.members)
    .sort((a, b) => b.local_score - a.local_score)
    .slice(0, 10);

  return ordered;
};

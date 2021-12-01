export type Days =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25";

type CompetitionDay = {
  get_star_ts: number;
};

type CompetiionDayLevel = {
  "1"?: CompetitionDay;
  "2"?: CompetitionDay;
};

export type Member = {
  id: string;
  local_score: number;
  name: string;
  stars: number;
  last_star_ts: string | number;
  global_score: number;
  completion_day_level: Partial<Record<Days, CompetiionDayLevel>>;
};

export type Leaderboard = {
  owner_id: string;
  event: string;
  members: Record<string, Member>;
};

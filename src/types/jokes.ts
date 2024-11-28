export type EmojiRating = 0 | 1 | 2 | 3 | 4;

export interface JokeVersion {
  id: number;
  joke_id: number;
  text: string;
  type: string;
  timestamp: string;
  created_at: string;
}

export interface Joke {
  id: number;
  original: string;
  status: string;
  rating: EmojiRating | null;
  tags: string[] | null;
  created_at: string;
  is_deleted: boolean;
  joke_versions?: JokeVersion[];
} 
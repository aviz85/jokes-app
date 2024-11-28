export type EmojiRating = 0 | 1 | 2 | 3 | 4;

export interface JokeVersion {
  id: string;
  content: string;
  createdAt: string;
}

export interface Joke {
  id: string;
  versions: JokeVersion[];
  rating?: EmojiRating;
  createdAt: string;
  updatedAt: string;
} 
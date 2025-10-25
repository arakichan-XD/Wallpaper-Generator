export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
export type Quality = 'standard' | 'enhanced';

export interface HistoryItem {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: AspectRatio;
  images: string[];
  timestamp: number;
}

export interface FavoriteItem {
  src: string;
  aspectRatio: AspectRatio;
}

export interface InspirationItem {
  id: string;
  prompt: string;
  style: string;
}

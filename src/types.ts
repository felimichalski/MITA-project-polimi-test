export interface ContentUnit {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  audioUrl?: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  details: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export type DostCategory = 'explain' | 'emotional' | 'advice' | 'fun' | 'general';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  image?: {
    data: string; // base64
    mimeType: string;
    name?: string;
    previewUrl?: string;
  };
  category?: DostCategory;
  suggestedFollowUps?: string[];
  replyOptions?: {
    type: string;
    text: string;
  }[];
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
  category?: DostCategory;
}

export interface PersonaProfile {
  id: string;
  name: string;
  tagline: string;
  avatarEmoji: string;
  toneDescription: string;
  badge: string;
  color: string;
}

export interface QuickPromptItem {
  id: string;
  title: string;
  prompt: string;
  category: DostCategory;
  emoji: string;
  subtitle: string;
}

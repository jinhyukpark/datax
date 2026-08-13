import { useQuery } from "@tanstack/react-query";
import type { GuideCard } from "@shared/schema";

export type GuideCardAccent = "green" | "orange" | "blue" | "purple" | "pink";

export interface GuideCardDisplay {
  id: string;
  label: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  link: string;
  accentColor: GuideCardAccent;
  emoji: string;
}

export const GUIDE_CARD_ACCENTS: readonly GuideCardAccent[] = ["green", "orange", "blue", "purple", "pink"] as const;

export const GUIDE_CARD_ACCENT_STYLES: Record<string, { border: string; badge: string; iconBg: string; hoverBg: string; hoverText: string; hoverIcon: string }> = {
  green: { border: 'border-green-200 dark:border-green-800', badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', iconBg: 'bg-green-100 dark:bg-green-900/40', hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/10', hoverText: 'group-hover:text-green-700 dark:group-hover:text-green-400', hoverIcon: 'group-hover:text-green-500' },
  orange: { border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400', iconBg: 'bg-orange-100 dark:bg-orange-900/40', hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/10', hoverText: 'group-hover:text-orange-600 dark:group-hover:text-orange-400', hoverIcon: 'group-hover:text-orange-400' },
  blue: { border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400', iconBg: 'bg-blue-100 dark:bg-blue-900/40', hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/10', hoverText: 'group-hover:text-blue-700 dark:group-hover:text-blue-400', hoverIcon: 'group-hover:text-blue-500' },
  purple: { border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400', iconBg: 'bg-purple-100 dark:bg-purple-900/40', hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/10', hoverText: 'group-hover:text-purple-700 dark:group-hover:text-purple-400', hoverIcon: 'group-hover:text-purple-500' },
  pink: { border: 'border-pink-200 dark:border-pink-800', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400', iconBg: 'bg-pink-100 dark:bg-pink-900/40', hoverBg: 'hover:bg-pink-50 dark:hover:bg-pink-900/10', hoverText: 'group-hover:text-pink-700 dark:group-hover:text-pink-400', hoverIcon: 'group-hover:text-pink-500' },
};

export const DEFAULT_GUIDE_CARDS: GuideCardDisplay[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    imageUrl: "",
    title: "ChatGPT MCP 공식 가이드",
    subtitle: "ChatGPT에서 MCP 서버를 연결하는 방법을 OpenAI 공식 문서에서 확인하세요.",
    link: "https://platform.openai.com/docs/guides/tools-remote-mcp",
    accentColor: "green",
    emoji: "🤖",
  },
  {
    id: "claude",
    label: "Claude",
    imageUrl: "",
    title: "Claude MCP 공식 가이드",
    subtitle: "Claude에서 MCP 서버를 설정하는 방법을 Anthropic 공식 문서에서 확인하세요.",
    link: "https://docs.anthropic.com/en/docs/agents-and-tools/mcp",
    accentColor: "orange",
    emoji: "🧠",
  },
];

export interface GuideCardsResponse {
  configured: boolean;
  cards: GuideCard[];
}

/**
 * Saved cards replace the defaults entirely. Defaults are only used when the
 * admin has never saved (`configured === false`); an intentionally saved empty
 * list stays empty.
 */
export function mergeGuideCards(data: GuideCardsResponse | undefined): GuideCardDisplay[] {
  if (!data || !data.configured) return DEFAULT_GUIDE_CARDS;
  return data.cards.map((s) => ({
    id: s.id,
    label: s.label || "",
    imageUrl: s.imageUrl || "",
    title: s.title,
    subtitle: s.subtitle,
    link: s.link,
    accentColor: (GUIDE_CARD_ACCENTS as readonly string[]).includes(s.accentColor) ? (s.accentColor as GuideCardAccent) : "green",
    emoji: s.emoji || "🔗",
  }));
}

export function useGuideCards() {
  const query = useQuery<GuideCardsResponse>({ queryKey: ["/api/guide-cards"] });
  return { ...query, cards: mergeGuideCards(query.data) };
}

/** Read a file as a base64 data URL so it can be persisted. */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

import type { NewsType } from '../../components/content/NewsItem.vue'

export interface NewsEntry {
  id: string
  type: NewsType
  at: Date
  author?: string
  text: string
}

export interface NewsData {
  location: string
  /** The page shown now; items are paged, never scrolled (A11Y-15). */
  page: { index: number; count: number }
  items: NewsEntry[]
}

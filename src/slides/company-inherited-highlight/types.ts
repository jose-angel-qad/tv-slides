export interface CompanyHighlightData {
  location: string
  /** Who shared it: the company or a parent site, as entered. */
  source: string
  sharedAt?: Date
  headline?: string
  message?: string
  image?: { src: string; alt: string }
}

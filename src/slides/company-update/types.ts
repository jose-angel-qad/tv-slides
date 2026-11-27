export interface CompanyUpdateData {
  location: string
  title?: string
  src: string
  alt: string
  /** For a PDF: the page shown now. */
  page?: { index: number; count: number }
}

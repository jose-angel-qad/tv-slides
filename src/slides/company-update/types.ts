export interface CompanyUpdateData {
  /** The update's name as entered in Redzone. It is the context in the slide header. */
  title?: string
  /** The image, or the current PDF page rendered as an image. Missing when nothing is attached. */
  src?: string
  alt?: string
  /** For a PDF with more than one page: the page shown now. */
  page?: { index: number; count: number }
  loading?: boolean
}

export interface NewHire {
  id: string
  name: string
  role: string
  startedAt: Date
  intro?: string
  photo?: string
}

export interface WelcomeData {
  location: string
  page?: { index: number; count: number }
  hires: NewHire[]
}

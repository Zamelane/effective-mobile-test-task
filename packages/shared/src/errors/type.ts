export interface ErrorResponse {
  status: number
  code: string
  message: string
  details?: unknown
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jokes: {
        Row: {
          id: number
          original: string
          status: string
          rating: number | null
          tags: string[] | null
          created_at: string
          is_deleted: boolean
        }
        Insert: {
          id?: number
          original: string
          status?: string
          rating?: number | null
          tags?: string[] | null
          created_at?: string
          is_deleted?: boolean
        }
        Update: {
          id?: number
          original?: string
          status?: string
          rating?: number | null
          tags?: string[] | null
          created_at?: string
          is_deleted?: boolean
        }
      }
      joke_versions: {
        Row: {
          id: number
          joke_id: number
          text: string
          type: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: number
          joke_id: number
          text: string
          type: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: number
          joke_id?: number
          text?: string
          type?: string
          timestamp?: string
          created_at?: string
        }
      }
    }
  }
} 
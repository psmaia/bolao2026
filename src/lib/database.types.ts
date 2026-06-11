export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          nickname: string
          email: string
          cpf: string | null
          phone: string | null
          cpf_verified: boolean
          phone_verified: boolean
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          nickname: string
          email: string
          cpf?: string | null
          phone?: string | null
          is_admin?: boolean
        }
        Update: {
          name?: string
          nickname?: string
          cpf?: string | null
          phone?: string | null
        }
      }
      matches: {
        Row: {
          id: string
          match_number: number
          stage: string
          group_name: string | null
          home_team: string
          away_team: string
          home_flag: string | null
          away_flag: string | null
          venue: string
          city: string
          country: string
          match_date: string
          home_score: number | null
          away_score: number | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          owner_id: string
          invite_code: string
          scoring_system: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          owner_id: string
          scoring_system?: Json
        }
        Update: {
          name?: string
          description?: string | null
          scoring_system?: Json
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: string
          joined_at: string
        }
        Insert: {
          group_id: string
          user_id: string
          role?: string
        }
        Update: { role?: string }
      }
      group_invites: {
        Row: {
          id: string
          group_id: string
          invited_by: string
          invited_email: string
          invited_user_id: string | null
          status: string
          token: string
          expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          group_id: string
          invited_by: string
          invited_email: string
        }
        Update: {
          status?: string
          invited_user_id?: string
        }
      }
      bets: {
        Row: {
          id: string
          group_id: string
          user_id: string
          match_id: string
          home_score_bet: number
          away_score_bet: number
          points_earned: number
          created_at: string
          updated_at: string
        }
        Insert: {
          group_id: string
          user_id: string
          match_id: string
          home_score_bet: number
          away_score_bet: number
        }
        Update: {
          home_score_bet?: number
          away_score_bet?: number
        }
      }
    }
    Views: {
      global_ranking: {
        Row: {
          user_id: string
          nickname: string
          name: string
          total_points: number
          groups_count: number
        }
      }
    }
    Functions: {
      calculate_points: { Args: { match_uuid: string }; Returns: void }
      get_group_ranking: {
        Args: { group_uuid: string }
        Returns: {
          user_id: string
          nickname: string
          name: string
          total_points: number
          exact_count: number
          winner_count: number
          bets_count: number
        }[]
      }
    }
  }
}

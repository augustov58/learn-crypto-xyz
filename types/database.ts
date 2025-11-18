export interface Database {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          resource_id: string | null;
          completed_at: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          resource_id?: string | null;
          completed_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          resource_id?: string | null;
          completed_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          favorited_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          favorited_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          favorited_at?: string;
          created_at?: string;
        };
      };
      user_learning_paths: {
        Row: {
          id: string;
          user_id: string;
          path_id: string;
          progress: number; // 0-100
          current_topic_index: number;
          started_at: string;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          path_id: string;
          progress?: number;
          current_topic_index?: number;
          started_at?: string;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          path_id?: string;
          progress?: number;
          current_topic_index?: number;
          started_at?: string;
          completed_at?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}


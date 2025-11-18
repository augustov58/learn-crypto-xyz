import { createClient } from '@/lib/supabase/client';

export class FavoritesService {
  private supabase = createClient();

  /**
   * Get all favorited topics for a user
   */
  async getFavorites(userId: string): Promise<Set<string>> {
    const { data, error } = await this.supabase
      .from('user_favorites')
      .select('topic_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching favorites:', error);
      return new Set();
    }

    return new Set(data.map((item) => item.topic_id));
  }

  /**
   * Check if a topic is favorited
   */
  async isFavorited(userId: string, topicId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" which is expected
      console.error('Error checking favorite:', error);
      return false;
    }

    return !!data;
  }

  /**
   * Add a topic to favorites
   */
  async addFavorite(userId: string, topicId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('user_favorites')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        favorited_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error adding favorite:', error);
      return false;
    }

    return true;
  }

  /**
   * Remove a topic from favorites
   */
  async removeFavorite(userId: string, topicId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('topic_id', topicId);

    if (error) {
      console.error('Error removing favorite:', error);
      return false;
    }

    return true;
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(userId: string, topicId: string): Promise<boolean> {
    const isFavorited = await this.isFavorited(userId, topicId);
    
    if (isFavorited) {
      return await this.removeFavorite(userId, topicId);
    } else {
      return await this.addFavorite(userId, topicId);
    }
  }
}

export const favoritesService = new FavoritesService();


import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type UserProgress = Database['public']['Tables']['user_progress']['Row'];

export interface ProgressItem {
  topicId: string;
  resourceId: string | null;
  completedAt: string;
  notes?: string | null;
}

export class ProgressService {
  private supabase = createClient();

  /**
   * Get all completed resources for a user
   */
  async getCompletedResources(userId: string): Promise<Set<string>> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .select('resource_id')
      .eq('user_id', userId)
      .not('resource_id', 'is', null);

    if (error) {
      console.error('Error fetching completed resources:', error);
      return new Set();
    }

    return new Set(data.map((item) => item.resource_id!).filter(Boolean));
  }

  /**
   * Get completed resources for a specific topic
   */
  async getTopicProgress(userId: string, topicId: string): Promise<Set<string>> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .select('resource_id')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .not('resource_id', 'is', null);

    if (error) {
      console.error('Error fetching topic progress:', error);
      return new Set();
    }

    return new Set(data.map((item) => item.resource_id!).filter(Boolean));
  }

  /**
   * Mark a resource as completed
   */
  async markResourceComplete(
    userId: string,
    topicId: string,
    resourceId: string,
    notes?: string
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        resource_id: resourceId,
        completed_at: new Date().toISOString(),
        notes: notes || null,
      });

    if (error) {
      console.error('Error marking resource complete:', error);
      return false;
    }

    return true;
  }

  /**
   * Mark a resource as incomplete
   */
  async markResourceIncomplete(
    userId: string,
    topicId: string,
    resourceId: string
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .eq('resource_id', resourceId);

    if (error) {
      console.error('Error marking resource incomplete:', error);
      return false;
    }

    return true;
  }

  /**
   * Sync localStorage progress to Supabase
   */
  async syncFromLocalStorage(userId: string, localProgress: Record<string, string[]>): Promise<void> {
    const operations: Promise<boolean>[] = [];

    for (const [topicId, resourceIds] of Object.entries(localProgress)) {
      for (const resourceId of resourceIds) {
        operations.push(
          this.markResourceComplete(userId, topicId, resourceId)
        );
      }
    }

    await Promise.all(operations);
  }

  /**
   * Get progress statistics for a user
   */
  async getProgressStats(userId: string): Promise<{
    totalCompleted: number;
    topicsWithProgress: number;
    recentCompletions: UserProgress[];
  }> {
    const { data: allProgress, error } = await this.supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching progress stats:', error);
      return {
        totalCompleted: 0,
        topicsWithProgress: 0,
        recentCompletions: [],
      };
    }

    const uniqueTopics = new Set(allProgress?.map((p) => p.topic_id) || []);

    return {
      totalCompleted: allProgress?.length || 0,
      topicsWithProgress: uniqueTopics.size,
      recentCompletions: allProgress || [],
    };
  }
}

export const progressService = new ProgressService();


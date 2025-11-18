import { z } from 'zod';

export const DifficultyLevelSchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);

export const ResourceTypeSchema = z.enum([
  'article',
  'video',
  'course',
  'documentation',
  'tutorial',
  'book',
]);

export const ResourceSchema = z.object({
  id: z.string().min(1, 'Resource ID is required'),
  title: z.string().min(1, 'Resource title is required'),
  url: z
    .string()
    .refine(
      (val) => {
        // Allow absolute URLs (http/https)
        if (val.startsWith('http://') || val.startsWith('https://')) {
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        }
        // Allow relative URLs starting with /
        if (val.startsWith('/')) {
          return true;
        }
        return false;
      },
      { message: 'Resource URL must be a valid absolute URL (http/https) or relative path (starting with /)' }
    ),
  type: ResourceTypeSchema,
  difficulty: DifficultyLevelSchema,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const TopicSchema = z.object({
  id: z.string().min(1, 'Topic ID is required'),
  name: z.string().min(1, 'Topic name is required'),
  description: z.string().min(1, 'Topic description is required'),
  category: z.string().min(1, 'Topic category is required'),
  resources: z.array(ResourceSchema).min(1, 'Topic must have at least one resource'),
  subtopics: z.array(z.string()).optional(),
  difficulty: DifficultyLevelSchema,
  position: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .optional(),
});

export const CategorySchema = z.object({
  id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Category name is required'),
  description: z.string().min(1, 'Category description is required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color (e.g., #3B82F6)'),
});

export const TopicsDataSchema = z.object({
  categories: z.array(CategorySchema).min(1, 'At least one category is required'),
  topics: z.array(TopicSchema).min(1, 'At least one topic is required'),
});

export type ValidatedResource = z.infer<typeof ResourceSchema>;
export type ValidatedTopic = z.infer<typeof TopicSchema>;
export type ValidatedCategory = z.infer<typeof CategorySchema>;
export type ValidatedTopicsData = z.infer<typeof TopicsDataSchema>;

// Validation helper functions
export function validateResource(resource: unknown): {
  success: boolean;
  data?: ValidatedResource;
  error?: z.ZodError;
} {
  const result = ResourceSchema.safeParse(resource);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateTopic(topic: unknown): {
  success: boolean;
  data?: ValidatedTopic;
  error?: z.ZodError;
} {
  const result = TopicSchema.safeParse(topic);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateCategory(category: unknown): {
  success: boolean;
  data?: ValidatedCategory;
  error?: z.ZodError;
} {
  const result = CategorySchema.safeParse(category);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateTopicsData(data: unknown): {
  success: boolean;
  data?: ValidatedTopicsData;
  error?: z.ZodError;
} {
  const result = TopicsDataSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// Additional validation: check for duplicate IDs and broken references
export function validateDataIntegrity(
  categories: ValidatedCategory[],
  topics: ValidatedTopic[]
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for duplicate category IDs
  const categoryIds = new Set<string>();
  categories.forEach((cat) => {
    if (categoryIds.has(cat.id)) {
      errors.push(`Duplicate category ID: ${cat.id}`);
    }
    categoryIds.add(cat.id);
  });

  // Check for duplicate topic IDs
  const topicIds = new Set<string>();
  topics.forEach((topic) => {
    if (topicIds.has(topic.id)) {
      errors.push(`Duplicate topic ID: ${topic.id}`);
    }
    topicIds.add(topic.id);
  });

  // Check for duplicate resource IDs within topics
  topics.forEach((topic) => {
    const resourceIds = new Set<string>();
    topic.resources.forEach((resource) => {
      if (resourceIds.has(resource.id)) {
        errors.push(`Duplicate resource ID "${resource.id}" in topic "${topic.id}"`);
      }
      resourceIds.add(resource.id);
    });
  });

  // Check that all topic categories exist
  topics.forEach((topic) => {
    if (!categoryIds.has(topic.category)) {
      errors.push(`Topic "${topic.id}" references unknown category "${topic.category}"`);
    }
  });

  // Check that all subtopic references exist
  topics.forEach((topic) => {
    topic.subtopics?.forEach((subtopicId) => {
      if (!topicIds.has(subtopicId)) {
        errors.push(
          `Topic "${topic.id}" references unknown subtopic "${subtopicId}"`
        );
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}


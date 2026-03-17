import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }), 
  schema: z.object({
    // The formal name of the project
    title: z.string(),
    
    // Enforcing a strict character limit ensures your Bento Box UI cards 
    // remain perfectly aligned and don't break the grid layout.
    summary: z.string().max(150, "Summary must be 150 characters or less for UI consistency."),
    
    date: z.date(),
    
    // Restricting categories helps recruiters filter your work accurately. 
    // This covers everything from pipelines and mapping to models and dashboards.
    category: z.enum([
      'Machine Learning', 
      'Data Engineering', 
      'Data Analytics', 
      'Software Engineering', 
      'GIS'
    ]),
    
    // An array of technologies used (e.g., ["Python", "PostgreSQL", "React"])
    stack: z.array(z.string()),
    role: z.string().optional(),
    impact: z.string().max(120).optional(),
    duration: z.string().optional(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).default([]),
    
    // Optional links to the code or live application
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    
    // A toggle to pin your most impactful work to the top of the homepage
    featured: z.boolean().default(false),
  })
});

export const collections = {
  'projects': projectCollection,
};
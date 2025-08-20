'use server';

import { z } from 'zod';
import { suggestProjects, type SuggestProjectsInput } from '@/ai/flows/project-matcher';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: 'Invalid data.' };
  }

  // In a real application, you would send an email or save to a database here.
  // For this example, we'll just log it to the console.
  console.log('New contact form submission:', parsed.data);

  return { success: true };
}

export async function matchProjectsAction(input: SuggestProjectsInput) {
  try {
    const result = await suggestProjects(input);
    return { relevantProjects: result.relevantProjects, error: null };
  } catch (error) {
    console.error('AI project matching failed:', error);
    return {
      relevantProjects: null,
      error: 'Failed to get project suggestions. Please try again later.',
    };
  }
}

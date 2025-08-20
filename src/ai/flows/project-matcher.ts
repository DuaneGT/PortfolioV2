// src/ai/flows/project-matcher.ts
'use server';
/**
 * @fileOverview A flow that suggests relevant projects based on skills mentioned in the 'About Me' section.
 *
 * - suggestProjects - A function that suggests projects based on the skills in the about me section.
 * - SuggestProjectsInput - The input type for the suggestProjects function.
 * - SuggestProjectsOutput - The return type for the suggestProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectsInputSchema = z.object({
  aboutMe: z
    .string()
    .describe("The 'About Me' section content, which includes a description of the developer's skills."),
  projects: z.array(z.string()).describe('A list of available projects.'),
});
export type SuggestProjectsInput = z.infer<typeof SuggestProjectsInputSchema>;

const SuggestProjectsOutputSchema = z.object({
  relevantProjects: z
    .array(z.string())
    .describe('A list of project names that are most relevant to the skills mentioned in the About Me section.'),
});
export type SuggestProjectsOutput = z.infer<typeof SuggestProjectsOutputSchema>;

export async function suggestProjects(input: SuggestProjectsInput): Promise<SuggestProjectsOutput> {
  return suggestProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectsPrompt',
  input: {schema: SuggestProjectsInputSchema},
  output: {schema: SuggestProjectsOutputSchema},
  prompt: `Given the following 'About Me' section:

  {{aboutMe}}

  And the following list of projects:

  {{#each projects}}- {{this}}\n{{/each}}

  Identify the projects that are most relevant to the skills and experience described in the 'About Me' section.
  Return ONLY the names of the most relevant projects.
  If no projects are relevant, return an empty array.
  `,
});

const suggestProjectsFlow = ai.defineFlow(
  {
    name: 'suggestProjectsFlow',
    inputSchema: SuggestProjectsInputSchema,
    outputSchema: SuggestProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

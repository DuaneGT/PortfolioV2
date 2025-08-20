export type Project = {
  title: string;
  description: string;
  image: string;
  category: 'Web Development' | 'Game Development';
  tags: string[];
  highlight: boolean;
  dataAiHint: string;
};

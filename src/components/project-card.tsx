import Image from 'next/image';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        project.highlight && "ring-2 ring-offset-2 ring-offset-background ring-accent shadow-lg"
      )}>
      <CardHeader>
        <div className="aspect-video relative mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="rounded-md object-cover"
            data-ai-hint={project.dataAiHint}
          />
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

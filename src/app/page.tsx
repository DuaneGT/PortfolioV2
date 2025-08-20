'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Lightbulb, Loader2, Send } from 'lucide-react';

import type { Project } from '@/types';
import { aboutMeText, initialProjects, skills } from '@/lib/data';
import { matchProjectsAction, submitContactForm } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectCard from '@/components/project-card';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isMatching, startMatchingTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleProjectMatch = async () => {
    startMatchingTransition(async () => {
      const projectTitles = projects.map(p => p.title);
      const result = await matchProjectsAction({ aboutMe: aboutMeText, projects: projectTitles });

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        return;
      }

      if (result.relevantProjects) {
        toast({
          title: 'Projects Matched!',
          description: "We've highlighted projects that best match the developer's skills.",
        });
        setProjects(prevProjects =>
          prevProjects.map(p => ({
            ...p,
            highlight: result.relevantProjects!.includes(p.title),
          }))
        );
      }
    });
  };

  async function onContactSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative h-[400px] flex items-center justify-center text-center text-white">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Hero background"
            fill
            className="object-cover"
            data-ai-hint="developer desk"
          />
          <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold">Hello world, I'm Veridian</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <section id="about" className="mb-20 md:mb-28 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary">A Multi-Faceted Developer</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {aboutMeText}
            </p>
            <Button onClick={handleProjectMatch} disabled={isMatching}>
              {isMatching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              {isMatching ? 'Analyzing Skills...' : 'Suggest Projects For Me'}
            </Button>
          </section>

          <section id="skills" className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Technical Skillset</h2>
              <p className="text-lg text-muted-foreground mt-2">Versatility in action.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section id="projects" className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Projects</h2>
              <p className="text-lg text-muted-foreground mt-2">A showcase of passion and proficiency.</p>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="game">Game Development</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map(p => <ProjectCard key={p.title} project={p} />)}
                </div>
              </TabsContent>
              <TabsContent value="web">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'Web Development').map(p => <ProjectCard key={p.title} project={p} />)}
                </div>
              </TabsContent>
              <TabsContent value="game">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'Game Development').map(p => <ProjectCard key={p.title} project={p} />)}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section id="contact" className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mt-2">Have a project in mind or want to connect? Let's talk.</p>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project or idea..." rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-right">
                       <Button type="submit" disabled={form.formState.isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                         {form.formState.isSubmitting ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         ) : (
                           <Send className="mr-2 h-4 w-4" />
                         )}
                         Send Message
                       </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    
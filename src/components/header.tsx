import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4 flex items-center justify-center md:justify-start">
        <Leaf className="h-7 w-7 text-primary" />
        <h1 className="ml-2 text-2xl font-bold tracking-tight font-headline">
          Veridian Portfolio
        </h1>
      </div>
    </header>
  );
}

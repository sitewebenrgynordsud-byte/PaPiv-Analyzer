import { Logo } from '@/components/icons';

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <h1 className="font-headline text-xl font-bold text-primary">PaPiv</h1>
        </div>
      </div>
    </header>
  );
}

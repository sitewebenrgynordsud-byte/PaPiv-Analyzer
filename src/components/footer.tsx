import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-muted/50 text-muted-foreground mt-auto border-t">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">
              Pa<span className="text-accent">Piv</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm hover:text-primary transition-colors"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-primary transition-colors"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm hover:text-primary transition-colors"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <a
              href="mailto:feedback@papiv.com"
              className="text-sm hover:text-primary transition-colors"
            >
              Feedback
            </a>
            <a
              href="https://github.com/FirebaseExtended/studio-prototypers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
        <div className="mt-8 text-center text-xs border-t border-border pt-6">
          &copy; {new Date().getFullYear()} PaPiv. All rights reserved. Built
          with free, open-source tools.
        </div>
      </div>
    </footer>
  );
}

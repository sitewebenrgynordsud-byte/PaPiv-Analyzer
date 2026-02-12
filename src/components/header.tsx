'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ALL_TOOLS } from '@/config/tools';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getBreadcrumb = () => {
    if (pathname === '/') {
      return null;
    }

    const segments = pathname.split('/').filter(Boolean);
    const isToolPage = segments[0] === 'tool' && segments.length === 2;

    let pageTitle = '';
    if (isToolPage) {
      const tool = ALL_TOOLS.find(
        (t) => t.slug.toLowerCase() === segments[1].toLowerCase()
      );
      pageTitle = tool ? tool.title : segments[1].replace(/-/g, ' ');
    } else {
      pageTitle = segments[segments.length - 1].replace(/-/g, ' ');
    }

    return (
      <nav
        aria-label="breadcrumb"
        className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex"
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors"
          prefetch={false}
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium capitalize text-foreground">
          {pageTitle}
        </span>
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 mr-4" prefetch={false}>
            <Logo className="h-6 w-6 text-primary" />
            <h1 className="font-headline text-xl font-bold text-primary">
              PaPiv
            </h1>
          </Link>
          {getBreadcrumb()}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {pathname !== '/' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

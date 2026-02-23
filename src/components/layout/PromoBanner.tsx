'use client';

import { X, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hiddenUntil = localStorage.getItem('hide-promo-banner');
    if (!hiddenUntil || new Date().getTime() > parseInt(hiddenUntil)) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const expires = new Date().getTime() + oneDay;
    localStorage.setItem('hide-promo-banner', expires.toString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-x-3">
            <Rocket className="h-6 w-6 shrink-0" aria-hidden="true" />
            <p className="text-sm leading-6">
              <strong className="font-semibold">Upgrade your workflow:</strong>{' '}
              Get 4 Senior AI Agents to write code & debug for you.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <a
              href="https://proworkflowlab.gumroad.com/l/ai-dev-team"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Get It Now $37
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="-m-1.5 p-1.5"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

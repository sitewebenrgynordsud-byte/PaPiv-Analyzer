'use client';

import dynamic from 'next/dynamic';
import type { ToolConfig } from '@/config/tools';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ToolSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-11 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-24" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

const ToolInterface = dynamic(
  () => import('@/components/tools/ToolInterface'),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

interface ToolLoaderProps {
    tool: ToolConfig;
}

export default function ToolLoader({ tool }: ToolLoaderProps) {
    return <ToolInterface tool={tool} />;
}

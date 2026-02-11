import Analyzer from '@/components/analyzer';
import Header from '@/components/header';

export default function AnalyzerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Analyzer />
      </main>
    </div>
  );
}

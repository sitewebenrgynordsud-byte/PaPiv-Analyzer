import Analyzer from '@/components/analyzer';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AnalyzerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Analyzer />
      </main>
      <Footer />
    </div>
  );
}

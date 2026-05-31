import MyListClient from '@/components/movie/MyListClient';

export default function MyListPage() {
  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12">
      <div className="container mx-auto px-4 md:px-8">
        <MyListClient />
      </div>
    </main>
  );
}

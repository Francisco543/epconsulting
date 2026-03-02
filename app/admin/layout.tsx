export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
        {children}
      </main>
    </div>
  );
}

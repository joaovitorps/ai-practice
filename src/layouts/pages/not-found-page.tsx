export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-500">Page not found</p>
      <a href="/dashboard" className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">
        Go to dashboard
      </a>
    </div>
  );
}
export function AnnouncementBar() {
  return (
    <div className="bg-accent/10 border-b border-accent/20 px-4 py-2">
      <p className="text-center text-sm font-medium text-accent">
        Q3 volume pricing now live —{' '}
        <button className="underline hover:no-underline transition-all">
          request a quote
        </button>
        {' '}for orders exceeding 50 units.
      </p>
    </div>
  );
}

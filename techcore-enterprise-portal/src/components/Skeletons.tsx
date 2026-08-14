export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl bg-surface border border-border p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-16 rounded bg-bg-elevated" />
        <div className="h-4 w-12 rounded bg-bg-elevated" />
      </div>
      <div className="h-32 rounded-lg bg-bg-elevated mb-4" />
      <div className="h-4 w-24 rounded bg-bg-elevated mb-2" />
      <div className="h-4 w-full rounded bg-bg-elevated mb-1" />
      <div className="h-4 w-3/4 rounded bg-bg-elevated mb-4" />
      <div className="flex justify-between mb-4">
        <div className="h-5 w-20 rounded bg-bg-elevated" />
        <div className="h-4 w-16 rounded bg-bg-elevated" />
      </div>
      <div className="h-10 rounded-lg bg-bg-elevated" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="bg-gradient-to-br from-[#060A10] via-[#0A0E14] to-[#0D1520] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-6 w-64 rounded bg-bg-elevated/60 animate-pulse" />
            <div className="h-12 w-full rounded bg-bg-elevated/60 animate-pulse" />
            <div className="h-12 w-3/4 rounded bg-bg-elevated/60 animate-pulse" />
            <div className="h-4 w-full rounded bg-bg-elevated/40 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-bg-elevated/40 animate-pulse" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 rounded-lg bg-bg-elevated/60 animate-pulse" />
              <div className="h-12 w-36 rounded-lg border border-border bg-bg-elevated/40 animate-pulse" />
            </div>
          </div>
          <div className="h-64 rounded-2xl bg-surface border border-border animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl bg-surface border border-border p-5 animate-pulse">
          <div className="flex justify-between mb-4"><div className="h-5 w-16 rounded bg-bg-elevated" /><div className="h-4 w-12 rounded bg-bg-elevated" /></div>
          <div className="h-32 rounded-lg bg-bg-elevated mb-4" />
          <div className="h-4 w-24 rounded bg-bg-elevated mb-2" />
          <div className="h-4 w-full rounded bg-bg-elevated mb-1" />
          <div className="h-4 w-3/4 rounded bg-bg-elevated mb-4" />
          <div className="flex justify-between mb-4"><div className="h-5 w-20 rounded bg-bg-elevated" /><div className="h-4 w-16 rounded bg-bg-elevated" /></div>
          <div className="h-10 rounded-lg bg-bg-elevated" />
        </div>
      ))}
    </div>
  );
}

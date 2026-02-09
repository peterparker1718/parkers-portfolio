"use client";

/**
 * Skeleton loading state for the InventoryManifest.
 * Renders pulsing placeholders that match the real layout structure.
 */
export default function InventorySkeleton() {
  return (
    <div
      className="min-h-screen bg-black text-white p-6 md:p-10"
      data-testid="inventory-skeleton"
    >
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-64 bg-zinc-800 rounded" />
            <div className="h-5 w-20 bg-green-900/30 rounded" />
          </div>
          <div className="flex gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-32 bg-zinc-800 rounded" />
            ))}
          </div>
        </div>

        {/* Lot row skeletons */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >
              <div className="col-span-2 space-y-2">
                <div className="h-4 w-24 bg-zinc-800 rounded" />
                <div className="h-6 w-48 bg-zinc-800 rounded" />
                <div className="h-3 w-32 bg-zinc-800 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-36 bg-zinc-800 rounded" />
                <div className="h-4 w-36 bg-zinc-800 rounded" />
                <div className="h-4 w-36 bg-zinc-800 rounded" />
              </div>
              <div className="col-span-2 flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-6 w-16 bg-zinc-800 rounded" />
                ))}
              </div>
              <div className="flex items-center justify-end">
                <div className="h-10 w-16 bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Flavor icons skeleton */}
        <div>
          <div className="h-3 w-56 bg-zinc-800 rounded mb-4" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-zinc-800"
              >
                <div className="w-8 h-8 bg-zinc-800 rounded-full" />
                <div className="h-2 w-10 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Origin cards skeleton */}
        <div>
          <div className="h-3 w-48 bg-zinc-800 rounded mb-4" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-zinc-800 space-y-2"
              >
                <div className="h-4 w-40 bg-zinc-800 rounded" />
                <div className="h-2 w-32 bg-zinc-800 rounded" />
                <div className="flex gap-1.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-4 w-12 bg-zinc-800 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail grid skeleton */}
        <div>
          <div className="h-3 w-44 bg-zinc-800 rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl border border-zinc-800 bg-zinc-900"
              />
            ))}
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="h-4 w-64 bg-zinc-800 rounded" />
          <div className="h-4 w-48 bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}

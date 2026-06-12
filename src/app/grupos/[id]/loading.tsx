export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-7 w-48" />
            <div className="skeleton h-3 w-64" />
          </div>
          <div className="flex gap-2">
            <div className="skeleton h-9 w-24 rounded-lg" />
            <div className="skeleton h-9 w-24 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="skeleton h-5 w-40 mb-4" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className="skeleton h-4 w-16" />
            <div className="flex-1 flex items-center justify-center gap-3">
              <div className="skeleton h-6 w-20" />
              <div className="skeleton h-8 w-24 rounded-lg" />
              <div className="skeleton h-6 w-20" />
            </div>
            <div className="skeleton h-9 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-10 w-32 rounded-lg" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-5 w-40" />
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="skeleton h-9 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

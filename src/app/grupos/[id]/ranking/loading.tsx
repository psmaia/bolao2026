export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="skeleton h-5 w-16" />
        <div className="skeleton h-7 w-56" />
      </div>
      <div className="skeleton h-12 w-full mb-4 rounded-xl" />
      <div className="card">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton h-6 w-6 rounded-full" />
              <div className="skeleton h-4 flex-1" />
              <div className="skeleton h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

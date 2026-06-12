export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card flex items-center gap-4">
          <div className="skeleton h-10 w-14 flex-shrink-0" />
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="skeleton h-8 w-8 rounded-full" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-6 w-10" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

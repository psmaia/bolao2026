export default function Loading() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="skeleton h-8 w-32 mb-6" />
      <div className="card flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ))}
        <div className="skeleton h-10 w-full rounded-lg mt-2" />
      </div>
    </div>
  )
}

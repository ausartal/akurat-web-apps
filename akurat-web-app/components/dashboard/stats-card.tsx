type StatsCardProps = {
  title: string
  value: string | number
  description: string
}

export default function StatsCard({
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div
      className='rounded-2xl border bg-white p-6 shadow-sm'
    >
      <p className='text-sm text-gray-500'>
        {title}
      </p>

      <h3
        className='mt-2 text-3xl font-bold'
      >
        {value}
      </h3>

      <p className='mt-2 text-sm text-gray-400'>
        {description}
      </p>
    </div>
  )
}

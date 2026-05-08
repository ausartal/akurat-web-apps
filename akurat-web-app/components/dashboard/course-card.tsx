import Link from 'next/link'

type CourseCardProps = {
  course: any
}

export default function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <Link
      href=
      {'/dashboard/courses/' + course.slug}
      className='overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
    >
      <div
        className='h-48 bg-gradient-to-r from-blue-500 to-sky-400'
      />

      <div className='p-6'>
        <div
          className='mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600'
        >
          {course.difficulty}
        </div>

        <h2
          className='text-2xl font-bold'
        >
          {course.title}
        </h2>

        <p
          className='mt-3 line-clamp-3 text-sm text-gray-500'
        >
          {course.description}
        </p>
      </div>
    </Link>
  )
}

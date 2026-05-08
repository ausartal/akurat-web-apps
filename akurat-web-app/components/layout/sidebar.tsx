import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside
      className='flex min-h-screen w-64 flex-col border-r bg-white p-6'
    >
      <h2
        className='mb-10 text-2xl font-bold text-blue-600'
      >
        AKURAT
      </h2>

      <nav className='flex flex-col gap-4'>
        <Link
          href='/dashboard'
          className='rounded-lg px-4 py-2 hover:bg-gray-100'
        >
          Dashboard
        </Link>

        <Link
          href='/dashboard/courses'
          className='rounded-lg px-4 py-2 hover:bg-gray-100'
        >
          Courses
        </Link>

        <Link
          href='/dashboard/progress'
          className='rounded-lg px-4 py-2 hover:bg-gray-100'
        >
          Progress
        </Link>

        <Link
          href='/dashboard/achievements'
          className='rounded-lg px-4 py-2 hover:bg-gray-100'
        >
          Achievements
        </Link>
      </nav>
    </aside>
  )
}

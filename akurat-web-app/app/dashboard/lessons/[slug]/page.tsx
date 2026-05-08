type LessonPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { slug } = await params

  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>
        {slug}
      </h1>

      <div
        className='rounded-2xl border bg-white p-8'
      >
        Lesson content coming soon.
      </div>
    </div>
  )
}

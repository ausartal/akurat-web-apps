type CourseDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params

  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>
        {slug}
      </h1>

      <p className='text-gray-500'>
        Course detail page coming soon.
      </p>
    </div>
  )
}

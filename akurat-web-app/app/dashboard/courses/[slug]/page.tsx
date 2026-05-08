'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { getCourseBySlug } from '@/features/course/services/course-detail.service'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default function CourseDetailPage({
  params,
}: Props) {
  const [course, setCourse] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadCourse() {
      const resolved =
        await params

      const data =
        await getCourseBySlug(
          resolved.slug
        )

      setCourse(data)

      setLoading(false)
    }

    loadCourse()
  }, [params])

  if (loading) {
    return (
      <div>
        Loading course...
      </div>
    )
  }

  if (!course) {
    return (
      <div>
        Course not found
      </div>
    )
  }

  return (
    <div className='space-y-10'>
      <section
        className='rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white'
      >
        <div className='max-w-3xl'>
          <div
            className='mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm'
          >
            {course.difficulty}
          </div>

          <h1
            className='text-5xl font-bold'
          >
            {course.title}
          </h1>

          <p
            className='mt-6 text-lg text-blue-100'
          >
            {course.description}
          </p>
        </div>
      </section>

      <section className='space-y-6'>
        <div>
          <h2
            className='text-3xl font-bold'
          >
            Modules
          </h2>

          <p className='mt-2 text-gray-500'>
            Explore course learning modules.
          </p>
        </div>

        <div className='space-y-6'>
          {course.modules.map(
            (module: any) => (
              <div
                key={module.id}
                className='rounded-2xl border bg-white p-6 shadow-sm'
              >
                <div className='mb-6'>
                  <h3
                    className='text-2xl font-bold'
                  >
                    {module.title}
                  </h3>

                  <p
                    className='mt-2 text-gray-500'
                  >
                    {module.description}
                  </p>
                </div>

                <div className='space-y-4'>
                  {module.lessons.map(
                    (lesson: any) => (
                      <Link
                        key={lesson.id}
                        href={
                          '/dashboard/lessons/' +
                          lesson.slug
                        }
                        className='flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50'
                      >
                        <div>
                          <h4
                            className='font-semibold'
                          >
                            {lesson.title}
                          </h4>

                          <p
                            className='mt-1 text-sm text-gray-500'
                          >
                            {
                              lesson.estimated_minutes
                            }
                            {' '}
                            minutes
                          </p>
                        </div>

                        <div
                          className='rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600'
                        >
                          Open
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
}

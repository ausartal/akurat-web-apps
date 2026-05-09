'use client'

import { useEffect, useState } from 'react'

import CourseCard from '@/components/dashboard/course-card'

import { getCourses } from '@/features/course/services/course.service'

export default function CoursesPage() {
  const [courses, setCourses] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadCourses() {
      const data = await getCourses()

      setCourses(data)

      setLoading(false)
    }

    loadCourses()
  }, [])

  if (loading) {
    return (
      <div>
        Loading courses...
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1
          className='text-4xl font-bold'
        >
          Chemistry Courses
        </h1>

        <p className='mt-2 text-gray-500'>
          Explore AKURAT learning modules.
        </p>
      </div>

      <div
        className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'
      >
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  )
}


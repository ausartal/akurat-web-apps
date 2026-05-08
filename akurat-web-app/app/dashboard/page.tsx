'use client'

import { useEffect, useState } from 'react'

import { getMyProfile } from '@/features/profile/services/profile.service'

export default function DashboardPage() {
  const [profile, setProfile] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadProfile() {
      const data = await getMyProfile()

      setProfile(data)

      setLoading(false)
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className='p-10'>
        Loading...
      </div>
    )
  }

  if (!profile) {
    return (
      <div className='p-10'>
        No profile found
      </div>
    )
  }

  return (
    <div className='p-10 space-y-4'>
      <h1 className='text-4xl font-bold'>
        Welcome back,
        {' '}
        {profile.full_name}
      </h1>

      <div className='space-y-2'>
        <p>
          Email:
          {' '}
          {profile.email}
        </p>

        <p>
          Role:
          {' '}
          {profile.role}
        </p>

        <p>
          XP:
          {' '}
          {profile.xp}
        </p>

        <p>
          Level:
          {' '}
          {profile.level}
        </p>

        <p>
          Streak:
          {' '}
          {profile.streak}
        </p>
      </div>
    </div>
  )
}

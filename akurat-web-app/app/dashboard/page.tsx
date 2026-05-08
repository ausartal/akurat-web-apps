'use client'

import { useEffect, useState } from 'react'

import HeroSection from '@/components/dashboard/hero-section'
import RecentActivity from '@/components/dashboard/recent-activity'
import StatsCard from '@/components/dashboard/stats-card'

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
    <div className='space-y-8'>
      <HeroSection
        name={profile.full_name}
      />

      <section
        className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'
      >
        <StatsCard
          title='XP'
          value={profile.xp}
          description='Current experience points'
        />

        <StatsCard
          title='Level'
          value={profile.level}
          description='Your chemistry mastery level'
        />

        <StatsCard
          title='Streak'
          value={profile.streak}
          description='Daily learning streak'
        />

        <StatsCard
          title='Role'
          value={profile.role}
          description='Current account role'
        />
      </section>

      <section
        className='grid gap-6 lg:grid-cols-3'
      >
        <div className='lg:col-span-2'>
          <RecentActivity />
        </div>

        <div
          className='rounded-2xl border bg-white p-6 shadow-sm'
        >
          <h2
            className='mb-4 text-xl font-semibold'
          >
            Profile
          </h2>

          <div className='space-y-2 text-sm'>
            <p>
              Email:
              {' '}
              {profile.email}
            </p>

            <p>
              Full Name:
              {' '}
              {profile.full_name}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

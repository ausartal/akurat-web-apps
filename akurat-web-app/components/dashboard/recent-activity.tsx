export default function RecentActivity() {
  return (
    <div
      className='rounded-2xl border bg-white p-6 shadow-sm'
    >
      <h2
        className='mb-4 text-xl font-semibold'
      >
        Recent Activity
      </h2>

      <div className='space-y-4'>
        <div className='rounded-xl bg-gray-50 p-4'>
          Completed Atomic Structure Quiz
        </div>

        <div className='rounded-xl bg-gray-50 p-4'>
          Earned +50 XP
        </div>

        <div className='rounded-xl bg-gray-50 p-4'>
          Started Stoichiometry Module
        </div>
      </div>
    </div>
  )
}

import LogoutButton from './logout-button'

export default function Topbar() {
  return (
    <header
      className='flex items-center justify-between border-b bg-white px-8 py-4'
    >
      <div>
        <h1 className='text-xl font-semibold'>
          Dashboard
        </h1>
      </div>

      <LogoutButton />
    </header>
  )
}

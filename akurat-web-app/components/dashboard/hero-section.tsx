type HeroSectionProps = {
  name: string
}

export default function HeroSection({
  name,
}: HeroSectionProps) {
  return (
    <section
      className='rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white'
    >
      <div className='max-w-2xl'>
        <h1
          className='text-5xl font-bold leading-tight'
        >
          Welcome back,
          <br />
          {name}
        </h1>

        <p className='mt-4 text-lg text-blue-100'>
          Continue your chemistry learning journey
          with AKURAT.
        </p>

        <button
          className='mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600'
        >
          Continue Learning
        </button>
      </div>
    </section>
  )
}

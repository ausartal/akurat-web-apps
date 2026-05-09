import { ReactNode } from 'react'

type StatsCardProps = {
  title: string
  value: string | number
  description: string
  icon?: ReactNode
  valueColor?: string
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
  valueColor = 'text-[#0F172A]',
}: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#F1F5F9] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">{title}</p>
          <h3 className={`mt-2 text-3xl font-extrabold ${valueColor}`}>{value}</h3>
          <p className="mt-1.5 text-xs text-[#94A3B8]">{description}</p>
        </div>
        {icon && (
          <div className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#94A3B8]">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

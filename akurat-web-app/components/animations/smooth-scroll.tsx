'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider() {
  useEffect(() => {
    // Only enable on public pages (not inside app/dashboard)
    if (window.location.pathname.startsWith('/dashboard')) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInstance: any = null
    let rafId: number

    void (async () => {
      try {
        // @studio-freight/lenis is installed; import it dynamically
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await import('@studio-freight/lenis' as any)
        const Lenis = mod.default ?? mod.Lenis ?? mod
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        })

        function raf(time: number) {
          lenisInstance?.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch {
        // Lenis unavailable — native scroll used
      }
    })()

    return () => {
      lenisInstance?.destroy?.()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}

// Fixed header is h-16 (64px); leave a little breathing room above the section.
const HEADER_OFFSET = 80

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * Smoothly scrolls the page to the element with the given id using an eased
 * requestAnimationFrame animation, so navigation "flows" into the section
 * instead of jumping instantly. Respects prefers-reduced-motion.
 *
 * @param id the target element id (without the leading '#')
 * @returns true if the element was found and scrolling started
 */
export function scrollToSection(id: string): boolean {
  if (typeof window === 'undefined') return false

  const el = document.getElementById(id)
  if (!el) return false

  const startY = window.scrollY
  const targetY =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  const distance = targetY - startY

  // Keep the URL in sync without triggering a native jump.
  window.history.replaceState(null, '', `#${id}`)

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion || distance === 0) {
    window.scrollTo(0, targetY)
    return true
  }

  // Scale duration with distance so short hops feel snappy and long ones glide.
  const duration = Math.min(1300, Math.max(550, Math.abs(distance) * 0.55))
  let startTime: number | null = null

  const step = (now: number) => {
    if (startTime === null) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
  return true
}

// Fixed header is h-16 (64px); leave a little breathing room above the section.
const HEADER_OFFSET = 80

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Track the in-flight animation so a new navigation (or a stray second call)
// can't spawn a competing rAF loop that fights the current one.
let activeFrame: number | null = null
let cancelUserScroll: (() => void) | null = null

function stopActiveAnimation() {
  if (activeFrame !== null) {
    cancelAnimationFrame(activeFrame)
    activeFrame = null
  }
  if (cancelUserScroll) {
    cancelUserScroll()
    cancelUserScroll = null
  }
}

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

  // Cancel any animation still in flight so loops can't overlap and fight.
  stopActiveAnimation()

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

  // If the user grabs the scroll (wheel/touch/keys), abort so we never yank
  // them back to the target after they've taken over.
  const onUserScroll = () => stopActiveAnimation()
  window.addEventListener('wheel', onUserScroll, { passive: true })
  window.addEventListener('touchmove', onUserScroll, { passive: true })
  cancelUserScroll = () => {
    window.removeEventListener('wheel', onUserScroll)
    window.removeEventListener('touchmove', onUserScroll)
  }

  const step = (now: number) => {
    if (startTime === null) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) {
      activeFrame = requestAnimationFrame(step)
    } else {
      stopActiveAnimation()
    }
  }

  activeFrame = requestAnimationFrame(step)
  return true
}

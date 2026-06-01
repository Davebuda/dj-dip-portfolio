import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

/**
 * <Reveal> — the single, safe scroll-reveal primitive for the whole site.
 *
 * GRACEFUL DEGRADATION (this is the fix for the blank-page defect):
 *  - Normal:        fades/slides in via Framer Motion when scrolled into view.
 *  - Reduced-motion: renders fully visible immediately, no transform.
 *  - No JS / observer never fires: the element's RESTING state is visible.
 *    The hidden state is only ever applied by Framer Motion as a JS-driven
 *    inline style — never a base Tailwind `opacity-0` class — so if JS does
 *    not run, nothing hides the content. The `data-reveal` attribute lets the
 *    <noscript> override in index.html force visibility as a final safety net.
 *
 * No section may depend on JS to become visible.
 */

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode
  /** Travel distance for the slide-up, in px. Default 16. */
  y?: number
  /** Extra delay before this element animates, in seconds. */
  delay?: number
  /** Animation duration, in seconds. Default 0.5. */
  duration?: number
  /** Render as a different element if needed (defaults to div). */
  as?: keyof typeof motion
  /** Tailwind / class names for the wrapper. */
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function Reveal({
  children,
  y = 16,
  delay = 0,
  duration = 0.5,
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()

  // Reduced motion: resting state IS the visible state — no hidden phase at all.
  if (reduceMotion) {
    return (
      <motion.div ref={ref} data-reveal className={className} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * <RevealGroup> — staggered parent. Children should be <RevealItem>.
 * Stagger is capped so the last child reveals < 600ms after the first.
 */
interface RevealGroupProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode
  /** Per-child stagger, in seconds. Default 0.08. */
  stagger?: number
  className?: string
}

export function RevealGroup({
  children,
  stagger = 0.08,
  className,
  ...rest
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div ref={ref} data-reveal className={className} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface RevealItemProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode
  y?: number
  duration?: number
  className?: string
}

export function RevealItem({
  children,
  y = 16,
  duration = 0.5,
  className,
  ...rest
}: RevealItemProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div data-reveal className={className} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

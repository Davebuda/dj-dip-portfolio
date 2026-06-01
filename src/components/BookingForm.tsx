import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/**
 * BookingForm — accessible booking enquiry form (RESIDENT-OS tokens).
 *
 * No backend: on submit we compose a `mailto:` to the booking address with the
 * form contents as the body and open the user's mail client. Opening the client
 * IS the delivery action — we never show a fake "sent!" confirmation. The
 * mailto/tel CTAs in Booking.tsx remain as a manual fallback.
 *
 * a11y: every field has a <label htmlFor>; invalid fields set aria-invalid and
 * aria-describedby pointing at an inline error with role="alert"; the submit
 * button is disabled while submitting.
 */

const BOOKING_EMAIL = '2djdip@gmail.com'

// Zod v4 syntax: top-level format validators (z.email()), NOT z.string().email().
const bookingSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.email('Enter a valid email address'),
  date: z.string().min(1, 'Pick an event date'),
  venue: z.string().min(2, 'Venue or event name'),
  message: z.string().optional(),
})

type BookingValues = z.infer<typeof bookingSchema>

function buildMailto(v: BookingValues): string {
  const subject = `Booking enquiry — ${v.venue}`
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Event date: ${v.date}`,
    `Venue / event: ${v.venue}`,
    '',
    v.message?.trim() ? v.message.trim() : '(no message)',
  ].join('\n')
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const fieldClass =
  'w-full min-h-[44px] rounded-xl bg-dip-card/80 border border-white/10 px-4 py-2.5 ' +
  'font-body text-dip-cream placeholder:text-dip-text-muted/70 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-dip-red focus:border-dip-red ' +
  'transition-colors'
const labelClass = 'block text-left font-heading font-bold text-xs tracking-[0.16em] uppercase text-dip-text-muted mb-2'
const errorClass = 'mt-1.5 text-left font-mono text-xs text-dip-rose'

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) })

  const onSubmit = (values: BookingValues) => {
    // Opening the mail client is the action — no server, no fake success state.
    window.location.href = buildMailto(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-left space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-name" className={labelClass}>Name</label>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'bf-name-error' : undefined}
            {...register('name')}
          />
          {errors.name && <p id="bf-name-error" role="alert" className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="bf-email" className={labelClass}>Email</label>
          <input
            id="bf-email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'bf-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && <p id="bf-email-error" role="alert" className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="bf-date" className={labelClass}>Event date</label>
          <input
            id="bf-date"
            type="date"
            className={fieldClass}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'bf-date-error' : undefined}
            {...register('date')}
          />
          {errors.date && <p id="bf-date-error" role="alert" className={errorClass}>{errors.date.message}</p>}
        </div>

        <div>
          <label htmlFor="bf-venue" className={labelClass}>Venue / event</label>
          <input
            id="bf-venue"
            type="text"
            className={fieldClass}
            aria-invalid={!!errors.venue}
            aria-describedby={errors.venue ? 'bf-venue-error' : undefined}
            {...register('venue')}
          />
          {errors.venue && <p id="bf-venue-error" role="alert" className={errorClass}>{errors.venue.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bf-message" className={labelClass}>Message <span className="normal-case font-light tracking-normal text-dip-text-muted/60">(optional)</span></label>
        <textarea
          id="bf-message"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Set length, music direction, budget, anything useful…"
          {...register('message')}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-brand w-full sm:w-auto text-sm px-8 min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed">
        {isSubmitting ? 'Opening mail…' : 'Send Booking Enquiry'}
      </button>
    </form>
  )
}

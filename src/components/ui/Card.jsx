/**
 * Card — ITLA Crush Design System
 *
 * Variants: default | paper | note
 */
export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variantClass = {
    default: '',
    paper: 'card-paper',
    note: 'card-note',
  }[variant] || ''

  const classes = ['card', variantClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

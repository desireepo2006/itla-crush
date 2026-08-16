/**
 * Button — ITLA Crush Design System
 *
 * Variants: primary | outline | accent
 * Sizes:    sm | md (default) | lg
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    accent: 'btn-accent',
  }[variant] || 'btn-primary'

  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size] || ''

  const classes = ['btn', variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

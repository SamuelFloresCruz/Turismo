import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type ImageOrPlaceholderProps = Omit<ImageProps, 'src'> & {
  src?: string | null
  placeholderClassName?: string
}

export function ImageOrPlaceholder({
  src,
  alt,
  placeholderClassName,
  className,
  ...props
}: ImageOrPlaceholderProps) {
  if (!src) {
    if ('fill' in props && props.fill) {
      return (
        <div
          role="img"
          aria-label={alt}
          className={cn('absolute inset-0 bg-black', placeholderClassName, className)}
        />
      )
    }

    const width = typeof props.width === 'number' ? props.width : undefined
    const height = typeof props.height === 'number' ? props.height : undefined

    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('bg-black', placeholderClassName, className)}
        style={{ width, height }}
      />
    )
  }

  return <Image src={src} alt={alt} className={className} {...props} />
}

'use client'
import { startTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const retry = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div className="mt-2">
        <Button onClick={retry}>Try again</Button>
      </div>
    </div>
  )
}

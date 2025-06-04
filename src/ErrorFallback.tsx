import * as React from 'react'
import { useEffect } from 'react'

interface ErrorFallbackProps {
  error: Error
  componentStack: string
  resetError: () => void
}

const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  useEffect(() => {
    // Optional: analytics, logging, recovery suggestions
    console.error('Captured in fallback:', error)
  }, [error])

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Something went wrong</h2>
      <p>{error?.message}</p>

      <button onClick={resetError}>Try Again</button>
    </div>
  )
}

export default ErrorFallback

import { useEffect, useState } from 'react'

const useWidth = () => {
  const [width, setWidth] = useState(0)

  const updateWidth = (width: number) => {
    setWidth(width)
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width, updateWidth }
}

export default useWidth

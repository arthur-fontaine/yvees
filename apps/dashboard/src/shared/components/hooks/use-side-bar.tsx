/* eslint-disable ts/naming-convention */
import { useEffect, useState } from 'react'

/**
 * Hook to manage the active button in the sidebar.
 */
export function useSideBar(defaultButton = 'data') {
  const [activeButton, setActiveButton] = useState<string>(defaultButton)

  useEffect(() => {
    const currentPath = location.pathname
    const pathMap: { [key: string]: string } = {
      '/data': 'data',
      '/journey': 'journey',
      '/robot': 'robot',
    }
    const active = pathMap[currentPath] || 'data'
    setActiveButton(active)
  }, [location.pathname])

  return [activeButton, setActiveButton] as const
}

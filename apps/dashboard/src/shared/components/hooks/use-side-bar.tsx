import { useEffect, useState } from 'react'

import { useRoute } from '../../../utils/router'

/**
 * Hook to manage the active button in the sidebar.
 */
export function useSideBar(defaultButton = 'data') {
  const [activeButton, setActiveButton] = useState<string>(defaultButton)
  const route = useRoute(['login', 'data', 'journeyhome', 'journeycreate', 'robothome', 'robotconfigure'])

  useEffect(() => {
    setActiveButton(route?.name || defaultButton)
  }, [route?.name])

  return [activeButton, setActiveButton] as const
}

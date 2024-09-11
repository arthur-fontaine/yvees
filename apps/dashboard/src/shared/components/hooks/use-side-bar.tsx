import { useEffect, useState } from 'react'

import { RouteNames, useRoute } from '../../../utils/router'

/**
 * Hook to manage the active button in the sidebar.
 */
export function useSideBar(defaultButton = 'data') {
  const [activeButton, setActiveButton] = useState<string>(defaultButton)
  const route = useRoute(Object.values(RouteNames))

  useEffect(() => {
    setActiveButton(route?.name || defaultButton)
  }, [route?.name])

  return [activeButton, setActiveButton] as const
}

import { useClerk } from '@clerk/clerk-react'
import React from 'react'
import { Icon } from 'ui'

import { useSideBar } from './hooks/use-side-bar'
import { RouteNames, router } from '../../utils/router'
import { Button } from '../components/ui/button'

/**
 * Sidebar component.
 */
export function Sidebar() {
  const [activeButton] = useSideBar()
  const { signOut } = useClerk()

  const handleButtonClick = (buttonName: 'data' | 'list' | 'robot') => {
    router.push(buttonName)
  }

  return (
      <div className="fixed bg-orangeLight h-full w-40 p-2 flex flex-col">
          <div className="pt-12">
              <SidebarButton
                icon={<Icon.BarChart4 color="$orange" size={24} />}
                isActive={activeButton === RouteNames.DATA}
                label="Données"
                onClick={() => handleButtonClick(RouteNames.DATA)}
              />
              <SidebarButton
                icon={<Icon.Bot color="$orange" size={24} />}
                isActive={activeButton === RouteNames.ROBOT}
                label="Robot"
                onClick={() => handleButtonClick(RouteNames.ROBOT)}
              />
              <SidebarButton
                icon={<Icon.Waypoints color="$orange" size={24} />}
                isActive={activeButton === RouteNames.JOURNEY_LIST}
                label="Parcours"
                onClick={() => handleButtonClick(RouteNames.JOURNEY_LIST)}
              />
          </div>
          <div className="flex-grow"></div>
          <SidebarButton
            icon={<Icon.LogOut color="$orange" size={24} />}
            isActive={activeButton === 'Logout'}
            label="Deconnexion"
            onClick={() => signOut(() => router.push(RouteNames.LOGIN))}
          />
      </div>
  )
}

function SidebarButton({
  icon,
  isActive,
  label,
  onClick,
}: {
  icon: JSX.Element
  isActive: boolean
  label: string
  onClick: () => void
}) {
  return (
      <Button
        className={`flex gap-2 my-2 w-full justify-start text-orange ${isActive ? 'bg-white' : ''} hover:bg-white hover:text-orange-dark`}
        onClick={onClick}
        variant="ghost"
      >
          {icon}
          {label}
      </Button>
  )
}

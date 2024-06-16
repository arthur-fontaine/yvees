import React from 'react'
import { Icon } from 'ui'

import { useSideBar } from './hook/use-side-bar'
import { router } from '../../utils/router'
import { Button } from '../components/ui/button'

/**
 * Sidebar component.
 */
export function Sidebar() {
  const [activeButton, setActiveButton] = useSideBar()

  const handleButtonClick = (buttonName: 'data' | 'journey' | 'robot') => {
    setActiveButton(buttonName)
    router.push(buttonName)
  }

  return (
    <div className="fixed bg-orangeLight h-full w-36 p-2 pt-12 flex flex-col gap-4">
      <SidebarButton
        icon={<Icon.BarChart4 color="$orange" size={24} />}
        isActive={activeButton === 'data'}
        label="Data"
        onClick={() => handleButtonClick('data')}
      />
      <SidebarButton
        icon={<Icon.Bot color="$orange" size={24} />}
        isActive={activeButton === 'robot'}
        label="Robot"
        onClick={() => handleButtonClick('robot')}
      />
      <SidebarButton
        icon={<Icon.Waypoints color="$orange" size={24} />}
        isActive={activeButton === 'journey'}
        label="Journey"
        onClick={() => handleButtonClick('journey')}
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
      className={`flex gap-2 justify-start text-orange ${isActive ? 'bg-white' : ''} hover:bg-white hover:text-orange-dark`}
      onClick={onClick}
      variant="ghost"
    >
      {icon}
      {label}
    </Button>
  )
}

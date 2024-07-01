import React from 'react'
import { Icon } from 'ui'

import { useSideBar } from './hook/use-side-bar'
import { router } from '../../utils/router'
import { Button } from '../components/ui/button'
import { useClerk } from "@clerk/clerk-react";


/**
 * Sidebar component.
 */
export function Sidebar() {
  const [activeButton, setActiveButton] = useSideBar()
  const { signOut } = useClerk();

  const handleButtonClick = (buttonName: 'data' | 'journey' | 'robot') => {
    setActiveButton(buttonName)
    router.push(buttonName)
  }

  return (
    <div className='fixed bg-orangeLight h-full w-36 p-2 flex flex-col'>
      <div className="pt-12">
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
      <div className='flex-grow'></div> 
        <SidebarButton
          icon={<Icon.LogIn color="$orange" size={24} />}
          isActive={activeButton === 'Logout'}
          label="Logout"
          onClick={() => signOut(() => router.push("login"))}
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

'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';

function SideBarFooter() {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const options = [
    {
      name: 'Settings',
      icon: Settings,
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
    },
  ];

  const onOptionClick = (option) => {
    if (option.path) {
      router.push(option.path);
      setOpen(false);
    }
  };

  return (
    <div className="mb-2">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;







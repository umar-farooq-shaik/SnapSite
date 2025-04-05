'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import SignInDialog from '../custom/SignInDialog';

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(false);

  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-4 flex flex-col gap-3">
    {/* --- Desktop Row --- */}
    <div className="hidden sm:flex justify-between items-center">
      {/* Left: Logo + Brand */}
      <Link href={'/'} className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          <Image src="/logo2.png" alt="logo" width={40} height={40} />
        </div>
        <div className="font-bold text-3xl">SnapSite</div>
      </Link>
  
      {/* Center: Export + Deploy */}
      {userDetail?.name && pathname.includes('/workspace/') && (
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => onActionBtn('export')}>
            <Download className="mr-1" /> Export
          </Button>
          <Button
            onClick={() => onActionBtn('deploy')}
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
          >
            <Rocket className="mr-1" /> Deploy
          </Button>
        </div>
      )}
  
      {/* Right: User Image */}
      {userDetail?.picture ? (
        <Image
          onClick={toggleSidebar}
          src={userDetail.picture}
          alt="userImage"
          width={40}
          height={40}
          className="rounded-full cursor-pointer object-cover"
        />
      ) : (
        <Button
          className="text-white"
          style={{ backgroundColor: Colors.BLUE }}
          onClick={() => setOpenDialog(true)}
        >
          Sign In
        </Button>
      )}
    </div>
  
    {/* --- Mobile Row 1 --- */}
    <div className="flex sm:hidden justify-between items-center">
      <Link href={'/'} className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          <Image src="/logo2.png" alt="logo" width={40} height={40} />
        </div>
        <div className="font-bold text-2xl">SnapSite</div>
      </Link>
  
      {userDetail?.picture ? (
        <Image
          onClick={toggleSidebar}
          src={userDetail.picture}
          alt="userImage"
          width={40}
          height={40}
          className="rounded-full cursor-pointer object-cover"
        />
      ) : (
        <Button
          className="text-white"
          style={{ backgroundColor: Colors.BLUE }}
          onClick={() => setOpenDialog(true)}
        >
          Sign In
        </Button>
      )}
    </div>
  
    {/* --- Mobile Row 2: Export & Deploy Centered --- */}
    {userDetail?.name && pathname.includes('/workspace/') && (
      <div className="flex sm:hidden justify-center gap-3">
        <Button variant="ghost" onClick={() => onActionBtn('export')}>
          <Download className="mr-1" /> Export
        </Button>
        <Button
          onClick={() => onActionBtn('deploy')}
          className="text-white"
          style={{ backgroundColor: Colors.BLUE }}
        >
          <Rocket className="mr-1" /> Deploy
        </Button>
      </div>
    )}
  
    <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
  </div>
  
  );
}

export default Header;


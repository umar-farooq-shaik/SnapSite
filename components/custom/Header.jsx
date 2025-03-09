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
    <div className="p-4 flex justify-between items-center relative">
      {/* Logo and SnapSite text */}
      <Link href={'/'} className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
          <Image src="/logo2.png" alt="logo" width={40} height={40} />
        </div>
        <div className="font-bold text-3xl">SnapSite</div>
      </Link>

      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        </div>
      ) : (
        <>
          {/* Centering Export & Deploy Buttons */}
          {pathname.includes('/workspace/') && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button variant="ghost" onClick={() => onActionBtn('export')}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                className="text-white"
                style={{ backgroundColor: Colors.BLUE }}
              >
                <Rocket /> Deploy
              </Button>
            </div>
          )}

          {/* User Image in Top Right */}
          <div className="absolute top-4 right-4">
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover"
            />
          </div>
        </>
      )}
      <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
  );
}

export default Header;


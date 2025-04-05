'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState();
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    if (userDetail && userDetail._id) {
      GetAllWorkspace();
    }
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    if (!userDetail?._id) {
      console.error("User ID is missing");
      return;
    }
  
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail._id, // Ensure userId is passed
    });
    setWorkSpaceList(result);
  };

  const generateTitle = (content) => {
    const words = content.split(' ');
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div>
        {workspaceList &&
            workspaceList.slice().reverse().map((workspace, index) => (
            <Link key={index} href={'/workspace/' + workspace?._id}>
              <h2 onClick={toggleSidebar} className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer truncate">
                {generateTitle(workspace?.messages[0]?.content)}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
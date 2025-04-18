"use client"
import '@/app/globals.css';
import { MessagesContext } from '@/context/MessagesContext' 
import { UserDetailContext } from '../../context/UserDetailContext';
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, {useContext, useState} from 'react'
import SignInDialog from './SignInDialog';
import { CreateWorkspace } from '../../convex/workspace';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

function Hero() {
  const [userInput,setUserInput]=useState();
  const {messages,setMessages}=useContext(MessagesContext);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const [openDialog,setOpenDialog]=useState(false);
  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace)
  const router = useRouter();
  const onGenerate=async(input)=>{
    if(!userDetail?.name)
      {
        setOpenDialog(true);
        return; 
      }
      if(userDetail?.token<10){
        toast('You do not have enough token!');
          return ;
    }
      const msg={
        role:'user',
        content:input
      }
    setMessages(msg);
  
    const workspaceId=await CreateWorkspace({
      user:userDetail._id,
      messages:[msg]
    });
    console.log(workspaceId);
    router.push('/workspace/'+workspaceId);

  }

  return (
    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
      {/* Heading */}
      <h2 className='font-bold text-4xl text-center break-words'>
        {Lookup.HERO_HEADING}
      </h2>
  
      {/* Description */}
      <p className='text-gray-400 font-medium text-center'>
        {Lookup.HERO_DESC}
      </p>
  
      {/* Input Section */}
      <div
        className='p-5 border rounded-xl max-w-xl w-full mt-3'
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className='flex gap-2'>
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'
            />
          )}
        </div>
      </div>
  
      {/* Suggestions Section */}
      <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
          >
            {suggestion}
          </h2>
        ))}
      </div>
  
      {/* Sign-In Dialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero
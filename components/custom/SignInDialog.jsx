import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '../../context/UserDetailContext';
import axios from 'axios';
import { useMutation } from 'convex/react';
import uuid4 from 'uuid4';
import { api } from '@/convex/_generated/api';

function SignInDialog({ openDialog, closeDialog }) {
    const { UserDetail, setUserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            const user = userInfo.data;
            await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuid4()
            });

            if (typeof window !== undefined) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            setUserDetail(userInfo?.data);
            closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className="w-[90%] max-w-sm sm:max-w-md md:max-w-lg mx-auto p-6 rounded-xl">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className="flex flex-col items-center justify-center gap-3 text-white">
                        <h2 className="font-bold text-2xl text-center">{Lookup.SIGNIN_HEADING}</h2>
                        <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                        <Button
                            className="bg-blue-500 text-white hover:bg-blue-400 mt-4"
                            onClick={googleLogin}
                        >
                            Sign In With Google
                        </Button>
                        <p className="text-xs text-center mt-4">{Lookup?.SIGNIN_AGREEMENT_TEXT}</p>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog;

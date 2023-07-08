import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/context/authContext";
import Loader from "@/components/Loader";

import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import ToastMessage from "@/components/ToastMessage";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!isLoading && currentUser) {
            router.push("/");
        }
    }, [currentUser, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const resetPassword = async () => {
        try {
            toast.promise(
                async () => {
                    await sendPasswordResetEmail(auth, email);
                },
                {
                    pending: "Generating reset link",
                    success: "Reset email send to your registered email id.",
                    error: "You may have entered wrong email id!",
                },
                {
                    autoClose: 5000,
                }
            );
            console.log("Email send to your registered email id.");
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, fProvider);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    return isLoading || (!isLoading && !!currentUser) ? (
        <Loader />
    ) : (
        <div className="h-[100vh] flex justify-center items-center bg-c1">
            <ToastMessage />
            <div className="md:flex items-center md:flex-col ">
                <div className="sm:text-center ">
                    <div className="sm:text-4xl font-bold sm:flex mx-36 text-center">
                        Login to Your Account
                    </div>
                    <div className="sm:mt-3 text-c3 sm:flex sm:mx-44  text-center ">
                        Connect and chat with anyone, anywhere
                    </div>
                </div>
                <div className="sm:flex items-center gap-2 sm:w-full sm:mx-0 mx-5 mt-10 mb-5 ">
                    <div
                        className=" sm:mx-0 mx-[120px] sm:my-0 my-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
                        onClick={signInWithGoogle}
                    >
                        <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                            <IoLogoGoogle size={24} />
                            <span>Login with Google</span>
                        </div>
                    </div>
                    <div
                        className=" sm:mx-0 mx-[120px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
                        onClick={signInWithFacebook}
                    >
                        <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                            <IoLogoFacebook size={24} />
                            <span>Login with Facebook</span>
                        </div>
                    </div>
                </div>
                <div className="sm:flex sm:items-center mx-64  gap-1">
                    <span className="w-5 h-[1px] bg-c3"></span>
                    <span className="text-c3 font-semibold">OR</span>
                    <span className="w-5 h-[1px] bg-c3"></span>
                </div>
            <div className="">
            <form
                    className="sm:flex sm:flex-col items-center sm:gap-3  sm:w-[500px] w-[450px] sm:mt-5 mt-5 "
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="sm:flex sm:w-full w-[345px] h-14 mx-[95px] bg-c5 rounded-xl outline-none border-none sm:px-5 px-2 text-c3"
                        autocomplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="sm:flex sm:w-full sm:my-0 my-2 w-[345px] h-14 mx-[95px] bg-c5 rounded-xl outline-none border-none sm:px-5 px-2 text-c3"
                        autocomplete="off"
                    />
                    <div className="sm:text-right text-right sm:flex mx-4 sm:w-full text-c3">
                        <span
                            className="cursor-pointer sm:mt-0 mt-0"
                            onClick={resetPassword}
                        >
                            Forgot Password?
                        </span>
                    </div>
                    <button className="sm:mt-2 mt-5 sm:w-full w-[340px] mx-[100px] h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Login to Your Account
                    </button>
                </form>
            </div>
                <div className="flex justify-center gap-1 text-c3 mt-5">
                    <span>Not a member yet?</span>
                    <Link
                        href="/register"
                        className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                    >
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
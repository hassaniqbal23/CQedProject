"use client"

import {ForgetPassword} from "@/components/common/ForgetPassword/ForgetPassword";
import TopNavbar from "@/components/common/navbar/TopNavbar";
import {useRouter} from "next/navigation";

export default function SchoolForgetPassword() {
    const router = useRouter();
    return (
        <>
            <TopNavbar showLogout={false} ></TopNavbar>
            <ForgetPassword onSubmit={() => {
                router.push("/students/forget-password/email-sent")
            } } onClick={() => {}}></ForgetPassword>
        </>
    )
}

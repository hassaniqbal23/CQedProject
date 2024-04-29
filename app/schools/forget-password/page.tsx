"use client"

import {ForgetPassword} from "@/components/common/ForgetPassword/ForgetPassword";
import TopNavbar from "@/components/common/navbar/TopNavbar";

export default function SchoolForgetPassword() {
    return (
        <>
            <TopNavbar showLogout={false} ></TopNavbar>
            <ForgetPassword onClick={() => {}}></ForgetPassword>
        </>
    )
}

"use client"

import {SchoolDetailsForm} from "@/components/common/SchoolDetailsForm/SchoolDetailsForm";
import BottomNavbar from "@/components/common/navbar/bottomNavbar";
import TopNavbar from "@/components/common/navbar/TopNavbar";

export default function SchoolAcceptInvite() {
    return (
        <div>
            <TopNavbar onLogout={() => {
            }}></TopNavbar>
            <SchoolDetailsForm></SchoolDetailsForm>
            <BottomNavbar onBackButton={() => {
            }} onContinue={() => {
            }}></BottomNavbar>
        </div>
    )
}

SchoolAcceptInvite.showLayout = false

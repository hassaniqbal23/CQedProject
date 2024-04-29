'use client'

import React from 'react'
import TopNavbar from '@/components/common/navbar/TopNavbar'
import StudentsQualities from '@/components/common/StudentsQualities'


function studentQualities() {
  return (
    <div><TopNavbar onLogout={() => {
    }}></TopNavbar>
        <StudentsQualities />
    </div>
  )
}

export default studentQualities
import React from 'react'
import Sidebar from '@/components/Sidebar'
import CreateFund from '../../../components/CreateFund'
import CheckCampaign from '../../../components/CheckCampaign'
function page() {
  return (
<div className="flex min-h-screen bg-[#faf8ff]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
        <CheckCampaign/>
        </div>
      </main>
    </div>  
    )
}

export default page
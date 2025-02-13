import Sidebar from '@/components/Sidebar';
import React from 'react'
import MyPaperList from '@/components/MyPaperList';

function page() {
  return (
<div className="flex min-h-screen bg-[#faf8ff]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <MyPaperList />
        </div>
      </main>
    </div>  )
}

export default page;
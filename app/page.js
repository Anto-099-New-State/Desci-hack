import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import RecentlyAdded from '@/components/RecentlyAdded';
import PaperList from '@/components/PaperList';
import Globalapi from '@/app/Gloabalapi/Globalapi'
import ConnectButton from '@/components/ConnectButton'
export default async function Home() {
  const uploads = await Globalapi.getRecent();
  const myUploads = await Globalapi.myPapers();
  console.log(myUploads);
  return (

    <div className="flex min-h-screen bg-[#faf8ff]">
      <Sidebar />
      <main className="flex-1 p-8">
           <ConnectButton className='absolute top-4 left-4 z-10' />
        <div className="max-w-6xl mx-auto space-y-8">
          <SearchBar />
          <RecentlyAdded uploads={uploads}/>
          <PaperList myUploads={myUploads} />
        </div>
      </main>
    </div>
  );
}
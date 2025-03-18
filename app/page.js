import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import RecentlyAdded from '@/components/RecentlyAdded';
import PaperList from '@/components/PaperList';
import Globalapi from '@/app/Gloabalapi/Globalapi'
import ConnectButton from '@/components/ConnectButton'
import Link from 'next/link'

export default async function Home() {
  const uploads = await Globalapi.getRecent();
  const myUploads = await Globalapi.myPapers();
  return (

    <div className="flex min-h-screen bg-[#faf8ff]">
           <h1> Navigate to  </h1> <p>(unfortunately the deployed link has been depreciated so , i new link has been created,sorry for the  inconvience)</p>
            <Link href="https://desci-hack-sqdi.vercel.app">DesciHacks</Link>
        </div>
      </main>
    </div>
  );
}

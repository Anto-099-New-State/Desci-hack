"use client"
import { Home, FileText, Users, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Home", active: true , href: '/'},
  { icon: FileText, label: "Your Papers" ,href: '/your-papers'},
  { icon: Users, label: "Fund others" ,href: '/fund-others'},
  { icon: DollarSign, label: "Fund Me" ,href: '/fund-me'},
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-lavender-100 p-6 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold">DeSci</span>
      </div>

      <button className="w-full bg-pink-500 text-white rounded-xl py-3 flex items-center justify-center space-x-2 hover:bg-pink-600 transition-colors">
        <Plus className="w-5 h-5" />
        <span>Add Paper</span>
      </button>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname ===  item.href; 
          return(
          <Link
            key={item.label}
            href={item.href}>
            <div
            onClick={()=>{setActiveItem(item.label)}}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-lavender-50 text-lavender-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}>

            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            </div>
          </Link>
          )
})}
      </nav>
    </aside>
  );
}
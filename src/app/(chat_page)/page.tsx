import Chatbox from "@/components/chat/chatbox/chatbox";
import Mychats from "@/components/chat/mychats/mychats";
import Sidebar from "@/components/shared/sidebar/sidebar";
import SidebarItem from "@/components/shared/sidebar/sidebarItem";
import { Home, MessageCircleMore, Search, Settings, UsersRound } from "lucide-react";

export default function App() {
  return (
    <>
      <div className="flex flex-row-3 h-screen bg-slate-100">
        <Sidebar>
          <SidebarItem icon={<Home color="#53c7ee" strokeWidth="1.25px" />} />
          <SidebarItem icon={<Search strokeWidth="1.25px" />} />
          <SidebarItem icon={<MessageCircleMore strokeWidth="1.25px" />} />
          <SidebarItem icon={<UsersRound strokeWidth="1.25px" />} />
          <SidebarItem icon={<Settings strokeWidth="1.25px" />} />
        </Sidebar>
        <div className="pt-6 pb-4 flex">
          <div className="flex ml-8 mr-6">
            <Mychats />
          </div>
          <div className="flex flex-1 w-[70vw]">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  )
}

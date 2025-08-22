import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../dahsboardLayout/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
         <Navbar type='main'/>
        </header>
        <main className="h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
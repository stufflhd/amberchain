import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../dahsboardLayout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function MainLayout({ children, title = 'AMBERCHAINS' }) {

  useDocumentTitle(title);


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={'dashContent p-4 gap-8'}>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Navbar type='main' />
        </header>
        <div className="flex flex-1 flex-col gap-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
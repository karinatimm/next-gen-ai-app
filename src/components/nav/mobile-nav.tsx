import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideNav from "@/components/nav/side-nav";

const MobileNav = () => {
  return (
    <div>
      <div className="px-4 mb-2 bg-slate-50 dark:bg-slate-900">
        <Sheet>
          <SheetTrigger className="p-2">
            <Menu size={30} />
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px]">
            <div className="mt-5"></div>
            <SideNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;

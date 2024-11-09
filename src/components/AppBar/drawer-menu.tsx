
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { Navbar } from "../Navbar";
import { useState } from "react";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-end bg-[#111827] py-2 pr-2 laptop:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size={"icon"}>
            <MenuIcon size={18} />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col bg-[#111827] p-0 text-white">
          <SheetHeader className="flex-2 mb-6 border-b border-solid border-secondary p-5 text-left">
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex-1">
            <Navbar.Mobile setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DrawerMenu;

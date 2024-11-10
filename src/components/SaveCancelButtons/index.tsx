import { Separator } from "@/components/ui/separator";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SaveCancelButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

function SaveCancelButtons({
  onConfirm,
  onCancel,
  isSaving,
}: SaveCancelButtonsProps) {
  return (
    <TooltipProvider>
      <div className="fixed bottom-10 right-10 flex rounded-full shadow-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onCancel}
              className="rounded rounded-l-full bg-yellow-700 px-4 py-2 text-white transition hover:bg-yellow-600 hover:text-[#030712]"
            >
              <IoMdClose size={30} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Cancelar seleção</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="bg-gray-700" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onConfirm}
              disabled={isSaving}
              className="flex items-center justify-center rounded rounded-r-full bg-yellow-700 px-4 py-2 text-white transition hover:bg-yellow-600 hover:text-[#030712]"
            >
              {isSaving ? (
                <AiOutlineLoading3Quarters size={30} className="animate-spin" />
              ) : (
                <MdOutlineDone size={30} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>Confirmar seleção</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default SaveCancelButtons;

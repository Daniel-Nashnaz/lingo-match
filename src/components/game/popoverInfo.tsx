import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface PopoverInfoProps {
  description: string;
  details: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverInfo: React.FC<PopoverInfoProps> = ({
  description,
  details,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm font-medium mb-2">{description}</p>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {details}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverInfo;

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const fonts = [
  { name: "Roboto", class: "font-roboto" },
  { name: "Open Sans", class: "font-open-sans" },
  { name: "Montserrat", class: "font-montserrat" },
  { name: "Lato", class: "font-lato" },
  { name: "Poppins", class: "font-poppins" },
  { name: "Playfair Display", class: "font-playfair" },
  { name: "Source Code Pro", class: "font-source-code" },
  { name: "Fira Code", class: "font-fira-code" },
];

export default function FontSelector({ font, setFont, isEditing }) {
  const currentFont = fonts.find((f) => f.name === font?.name) || fonts[0];

  return (
    <div className="relative inline-block w-fit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#1c1c1f] border border-white/10 text-white/80 font-medium px-3 py-2 rounded-xl flex items-center justify-start gap-2 w-64"
            disabled={!isEditing}
          >
            <span className={`${font?.class || "font-poppins"} text-2xl`}>
              Aa
            </span>
            <span className="text-sm truncate">{currentFont.name}</span>
            <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="center"
          portal={undefined}
          sideOffset={12}
          className="bg-[#1c1c1f]/90 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl z-50 mt-2 w-72 max-h-96 overflow-auto grid grid-cols-3 gap-3"
        >
          {fonts.map((f) => (
            <DropdownMenuItem
              key={f.name}
              title={f.name}
              onClick={() => isEditing && setFont(f)}
              className={`flex items-center justify-center aspect-square rounded-xl text-white text-2xl font-semibold cursor-pointer transition-all hover:bg-white/10 ${
                font?.class === f.class
                  ? "ring-2 ring-white bg-white/10"
                  : "bg-white/5"
              }`}
            >
              <span className={`${f.class}`}>Aa</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

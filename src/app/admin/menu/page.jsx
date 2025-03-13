"use client";

// components
import TopBar from "@/components/admin/TopBar";
import EditableMenu from "@/components/admin/EditableMenu";
import PreviewMenu from "@/components/admin/PreviewMenu";
// react
import { useState } from "react";

export default function MenuPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {/* TopBar */}
      <TopBar isEditing={isEditing} setIsEditing={setIsEditing} />

      {/* Menu ocupa 2/3 de la pantalla horizontalmente */}
      <div className="flex flex-row">
        <div className="w-2/3 p-4">
          <EditableMenu isEditing={isEditing} />
        </div>
        <div className="w-1/3 p-4">
          <PreviewMenu />
        </div>
      </div>
    </>
  );
}

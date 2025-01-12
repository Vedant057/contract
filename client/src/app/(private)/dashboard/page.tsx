"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadModal } from "@/components/modals/upload-modal";
import UserContracts from "@/components/dashboard/user-contracts";

export default function Dashboard() {

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div>
     <UserContracts />
    </div>
  );
}
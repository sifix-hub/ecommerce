"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";


export default function SetupPage() {

  const onOpen = useStoreModal((state)=>state.onOpen);
  const isOpen = useStoreModal((state)=>state.isOpen);

  useEffect(()=>{
    !isOpen && onOpen();
  }, []);

  return (
    <div className="p-4">
      
      <UserButton />
    </div>
  );
}

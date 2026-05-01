"use client";

import { LogOut } from "lucide-react";
import Button from "./Button";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center">
      <div className="bg-white rounded-[25px] p-8 w-[90%] max-w-sm mx-4 shadow-xl flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#DD303D]/10 flex items-center justify-center">
          <LogOut className="text-[#DD303D] w-7 h-7" />
        </div>
        <div className="text-center">
          <h3 className="text-[#262525] font-bold text-[18px] italic">Logout</h3>
          <p className="text-gray-500 text-[13px] mt-1">Are you sure you want to logout?</p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="white" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant="red" className="flex-1" onClick={onConfirm}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

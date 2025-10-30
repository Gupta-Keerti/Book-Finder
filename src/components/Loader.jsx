import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-3 text-blue-600">Loading books...</span>
    </div>
  );
}

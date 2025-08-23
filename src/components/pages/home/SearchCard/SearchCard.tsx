import React from "react";
import { Search } from "lucide-react";

function SearchCard() {
  return (
    <div className="px-2 py-3 bg-zinc-100 rounded-xl flex items-center min-w-[250px]">
      <input
        type="text"
        placeholder="بحث عن عقارك..."
        className="flex-1 bg-transparent outline-none text-zinc-700 placeholder-zinc-500 text-right"
      />
      <Search className="w-5 h-5 text-zinc-500 ml-2" />
    </div>
  );
}

export default SearchCard;

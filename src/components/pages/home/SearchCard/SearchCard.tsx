import Image from "next/image";
import React from "react";

function SearchCard() {
  return (
    <div>
      <Image src="/images/search.svg" alt="search" width={150} height={100} />
    </div>
  );
}

export default SearchCard;

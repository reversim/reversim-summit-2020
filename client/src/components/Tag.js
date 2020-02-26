import React from "react";
import { TAG_COLORS } from "../data/proposals";

const Tag = name =>
  name.toLowerCase() in TAG_COLORS && (
    <div key={name} className="b-regular px-1 w-max-content mr-4 my-1 cursor-pointer text-purple2 font-weight-bold">
      {name}
    </div>
  );

export default Tag;

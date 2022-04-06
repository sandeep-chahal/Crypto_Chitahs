import React from "react";

const Attribute = ({
  name,
  value,
  className = "",
  title = "",
  onClick = () => {},
}) => {
  return (
    <div
      title={title}
      onClick={onClick}
      className={`bg-slate-800 bg-opacity-50 text-center my-2 mr-4 py-1 px-4 rounded-md cursor-pointer border-2 transition-all hover:bg-slate-200 hover:text-slate-800 select-none ${className}`}
    >
      <p className="text-xs">{name}</p>
      <p className="font-bold ">{value}</p>
    </div>
  );
};

export default Attribute;

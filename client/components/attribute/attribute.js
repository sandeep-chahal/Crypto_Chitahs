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
      className={`bg-slate-700 my-2 mr-4 py-1 px-4 rounded-md cursor-pointer transition-all hover:bg-slate-800 select-none ${className}`}
    >
      <p className="font-bold">{name}</p>
      <p>{value}</p>
    </div>
  );
};

export default Attribute;

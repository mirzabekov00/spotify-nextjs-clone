import React, { ReactNode } from "react";

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      className="flex items-center space-x-2 hover:text-white"
      onClick={onClick}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default SidebarButton;

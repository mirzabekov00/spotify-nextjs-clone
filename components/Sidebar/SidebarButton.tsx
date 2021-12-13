import React, { ReactNode } from "react";

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label }) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default SidebarButton;

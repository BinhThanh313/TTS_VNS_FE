import React from "react";

interface DetailFieldProps {
  label: string;
  value?: React.ReactNode;
}

export const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-500 text-[13px] mb-1">{label}</div>
      <div className="border-b border-gray-300 pb-1.5 font-medium text-gray-800 text-[14px] flex items-baseline gap-1 min-h-[28px]">
        {value || "......"}
      </div>
    </div>
  );
};
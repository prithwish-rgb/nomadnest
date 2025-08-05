// components/ui/label.tsx
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="text-sm font-medium text-gray-700" {...props}>
      {children}
    </label>
  );
};

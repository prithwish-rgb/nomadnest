import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 24, 
  className = "", 
  text = "Loading..." 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2 className="animate-spin" size={size} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
} 
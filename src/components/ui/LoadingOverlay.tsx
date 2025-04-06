
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  subMessage?: string;
  minimal?: boolean;
  autoDismiss?: number; // Time in ms after which to auto-dismiss
  onDismissed?: () => void;
}

const LoadingOverlay = ({ 
  isLoading, 
  message = "Processing", 
  subMessage = "Please wait while we process your request.",
  minimal = false,
  autoDismiss = 10000, // Default auto-dismiss to 10 seconds
  onDismissed
}: LoadingOverlayProps) => {
  const [visible, setVisible] = useState(isLoading);
  
  useEffect(() => {
    setVisible(isLoading);
    
    if (isLoading) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismissed) onDismissed();
      }, autoDismiss);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, autoDismiss, onDismissed]);
  
  if (!visible) return null;
  
  if (minimal) {
    return (
      <div className="fixed top-4 right-4 bg-card p-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto" />
        <h3 className="text-xl font-semibold">{message}</h3>
        <p className="text-muted-foreground">
          {subMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;

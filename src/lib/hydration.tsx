"use client";

import { useEffect, useState } from "react";

// Hook to detect if we're on the client side
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Hook to suppress hydration warnings for specific elements
export function useSuppressHydrationWarning() {
  const [suppressWarning, setSuppressWarning] = useState(false);

  useEffect(() => {
    // Suppress hydration warnings after initial mount
    setSuppressWarning(true);
  }, []);

  return suppressWarning;
}

// Component wrapper for elements that might be modified by browser extensions
export function HydrationSafeElement({ 
  children, 
  as: Component = 'div',
  ...props 
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  const isClient = useIsClient();

  if (!isClient) {
    return <Component {...props} suppressHydrationWarning={true}>{children}</Component>;
  }

  return <Component {...props}>{children}</Component>;
} 
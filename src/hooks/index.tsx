import React, { ReactNode } from "react";
import { AuthProvider } from "./auth";

interface ProviderProps {
  children: ReactNode;
}
function Providers({ children }: ProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;

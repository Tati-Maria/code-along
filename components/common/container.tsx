import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl h-full mx-auto px-3 py-6 md:px-6 lg:px-8">{children}</div>;
}

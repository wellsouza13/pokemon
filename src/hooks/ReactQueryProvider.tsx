"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
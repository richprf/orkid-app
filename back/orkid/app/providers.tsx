"use client";

import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import {  persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            {children}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
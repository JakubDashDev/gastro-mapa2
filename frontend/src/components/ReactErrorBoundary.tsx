import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function FallbackComponent() {
  return (
    <div className="w-screen h-[calc(100dvh)] bg-darkBg flex items-center justify-center text-white">
      Wystąpił nieoczekiwany błąd aplikacji 💔. Odswież stronę, jeśli to nie pomoże skontaktuj się z administratorem.
    </div>
  );
}

function ReactErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>;
}

export default ReactErrorBoundary;

import React from "react";

function RouteError() {
  return (
    <div className="w-screen h-[calc(100dvh)] bg-darkBg flex items-center justify-center text-white">
      Wystąpił nieoczekiwany błąd aplikacji 💔. Odswież stronę, jeśli to nie pomoże skontaktuj się z administratorem.
    </div>
  );
}

export default RouteError;

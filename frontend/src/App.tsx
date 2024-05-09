import { Fragment, useEffect, useState } from "react";
import Map from "./components/features/Map";
import WelcomeLoader from "./components/ui/WelcomeLoader";
import SideNav from "./components/ui/SideNav";
import useGetRestaurants from "./hooks/useGetRestaurants";
import { useAppSelector } from "./redux/store";

function App() {
  const { loading, error, isError } = useGetData();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  //HANDLING DARK MODE FEATURE
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") ? JSON.parse(localStorage.getItem("darkMode") || "") : true
  );
  //HANDLING DARK MODE FEATURE

  if (loading) return <WelcomeLoader />;

  return (
    <main className={`${darkMode ? "dark flex font-sans" : "flex font-sans"}`}>
      {isError ? (
        error && "data" in error ? (
          <div className="w-screen h-screen bg-darkBg flex items-center justify-center text-white">
            {error.data.message}
          </div>
        ) : (
          <div className="w-screen h-screen bg-darkBg flex items-center justify-center text-white">
            Wystąpił nieoczekiwany błąd aplikacji 💔. Odswież stronę, jeśli to nie pomoże skontaktuj się z
            administratorem.
          </div>
        )
      ) : (
        <Fragment>
          <SideNav data={restaurants} darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex-1 h-screen border-none xl:border-y-4 xl:border-x-4 border-white">
            <Map data={restaurants} darkMode={darkMode} />
          </div>
        </Fragment>
      )}
    </main>
  );
}

export default App;

function useGetData() {
  const { isLoading, error, isError } = useGetRestaurants({
    keyword: undefined,
    filters: undefined,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  return { loading, error, isError };
}

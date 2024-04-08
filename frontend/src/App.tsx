import { useEffect, useState } from "react";
import Map from "./components/features/Map";
import Loader from "./components/ui/WelcomeLoader";
import SideNav from "./components/ui/SideNav";
import useGetRestaurants from "./hooks/useGetRestaurants";
import { useAppSelector } from "./redux/store";

function App() {
  const { loading, error } = useGetData();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  //HANDLING DARK MODE FEATURE
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode")
      ? JSON.parse(localStorage.getItem("darkMode") || "")
      : false
  );
  //HANDLING DARK MODE FEATURE

  if (loading) return <Loader />;

  return (
    <main className={`${darkMode ? "dark flex font-sans" : "flex font-sans"}`}>
      <SideNav
        data={restaurants}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="flex-1 h-screen border-none xl:border-y-4 xl:border-x-4 border-white">
        <Map data={restaurants} darkMode={darkMode} />
      </div>
    </main>
  );
}

export default App;

function useGetData() {
  const { isLoading, error } = useGetRestaurants({
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

  return { loading, error };
}

import React, { useEffect, useState } from 'react';
import Map from './components/features/Map';
import { useGetRestaurantsQuery } from './services/restaurantsApi';
import Loader from './components/ui/Loader';
import SideNav from './components/ui/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurants } from './redux/restaurantsSlice';
import useGetRestaurants from './hooks/useGetRestaurants';

function App() {
  const { restaurants } = useSelector((state) => state.restaurants);
  const { loading, error } = useGetData();

  //HANDLING DARK MODE FEATURE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode')
      ? JSON.parse(localStorage.getItem('darkMode'))
      : false
  );
  //HANDLING DARK MODE FEATURE

  if (loading) return <Loader />;

  return (
    <main className={`${darkMode ? 'dark flex font-sans' : 'flex font-sans'}`}>
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
  const { getRestaurants, isLoading, error } = useGetRestaurants();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants({ keyword: undefined, filter: undefined });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  return { loading, error };
}

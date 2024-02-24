import React, { useEffect, useState } from 'react';
import Map from './components/features/Map';
import { useGetRestaurantsQuery } from './services/restaurantsApi';
import Loader from './components/ui/Loader';
import SideNav from './components/features/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurants } from './redux/restaurantsSlice';
import useGetRestaurants from './hooks/useGetRestaurants';

function App() {
  const { restaurants } = useSelector((state) => state.restaurants);
  const { loading, error } = useGetData();

  if (loading) return <Loader />;

  return (
    <main className="flex font-sans">
      <SideNav data={restaurants} />
      <div className="w-4/5 h-screen border-y-4 border-e-4 border-white">
        <Map data={restaurants} />
      </div>
    </main>
  );
}

export default App;

function useGetData() {
  const { getRestaurants, isLoading, error } = useGetRestaurants();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants({ keyword: undefined });
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

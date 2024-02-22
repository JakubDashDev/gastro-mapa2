import React, { useEffect, useState } from 'react';
import Map from './components/features/Map';
import { useGetRestaurantsQuery } from './services/restaurantsApi';
import Loader from './components/ui/Loader';
import SideNav from './components/features/SideNav';

function App() {
  const { loading, data, error } = useGetData();

  if (loading) return <Loader />;

  return (
    <main className="flex font-sans">
      <SideNav data={data} />
      <div className="w-4/5 h-screen border-y-4 border-e-4 border-white">
        <Map data={data} />
      </div>
    </main>
  );
}

export default App;

function useGetData() {
  const { data, isLoading, error } = useGetRestaurantsQuery();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  return { loading, data, error };
}

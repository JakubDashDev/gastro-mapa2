import Card from "../../components/ui/Card";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";

function HomePage() {
  const { isLoading, error } = useGetRestaurantsAdmin();

  const { restaurants } = useAppSelector((state) => state.restaurants);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader color="primary-500" />
      </div>
    );
  {
    error && "data" in error ? (
      <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-black rounded-lg">
        {error.data.message}
      </div>
    ) : (
      <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-black rounded-lg">
        Wystąpił nieoczekiwany błąd. Jeśli błąd nadal będzie się powtarzać, proszę skontaktuj się z administracją.
      </div>
    );
  }

  return (
    <div className="relative pt-24 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 grid-flow-row">
      <h3 className="absolute top-5 left-4 font-bold uppercase text-gray-500 text-sm">Szybki Dostęp</h3>
      <Card linkTo="/dashboard/restaurants">
        <Card.Header backgroundColor="bg-gradient-to-r from-cyan-600 from-0% via-sky-600 via-50% to-blue-800 to-95%">
          <span className="text-xl px-5 py-2 text-white">{restaurants.length} Restauracji</span>
        </Card.Header>
        <Card.Body>
          <h6 className="text-lg font-bold text-black/70">Edytuj Resturacje</h6>
          <span className="text-gray-500">Przeglądaj, edytuj, usuwaj</span>
        </Card.Body>
      </Card>
      <Card linkTo="/dashboard/account">
        <Card.Header backgroundColor="bg-gradient-to-r from-emerald-600 from-0% via-emerald-700 via-50% to-emerald-900 to-95%">
          <span className="text-xl px-5 py-2 text-white">Ustawienia</span>
        </Card.Header>
        <Card.Body>
          <h6 className="text-lg font-bold text-black/70">Ustawienia konta</h6>
          <span className="text-gray-500">Adres email, hasło, nazwa użytkownika</span>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;

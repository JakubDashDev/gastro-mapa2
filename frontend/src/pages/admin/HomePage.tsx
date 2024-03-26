import Card from "../../components/admin/UI/Card";
import useGetRestaurants from "../../hooks/useGetRestaurants";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";

function HomePage() {
  const { isLoading, error } = useGetRestaurantsAdmin({
    keyword: undefined,
    filters: undefined,
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>error...</span>;

  return (
    <div className="relative pt-24 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 grid-flow-row">
      <h3 className="absolute top-5 font-bold uppercase text-gray-500 text-sm">
        Szybki Dostęp
      </h3>
      <Card>
        <Card.Header>
          <h6>nig</h6>
        </Card.Header>
        <Card.Body>
          <h6 className="text-lg font-bold text-black/70">Resturacje</h6>
          <span className="text-gray-500">Przeglądaj, edytuj, usuwaj</span>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>pablo 2115</Card.Header>
        <Card.Body>
          <span>pablo2115</span>
          <span>pablo2115</span>
          <span>pablo2115</span>
          <span>pablo2115</span>
          <span>pablo2115</span>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;

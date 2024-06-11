function getParams(location: Location) {
  const searchParams = new URLSearchParams(location.search);

  return {
    keywordQuery: searchParams.get("keyword") || "",
    filtersQuery: searchParams.get("filters") || "",
    sort: searchParams.get("sort") || "",
  };
}

export default getParams;

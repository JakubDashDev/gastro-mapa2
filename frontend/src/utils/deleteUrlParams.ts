const removeQuery = (key: "keyword" | "filters" | "sort") => {
  const searchParams = new URLSearchParams(location.search);

  searchParams.delete(key);
  return searchParams.toString();
};

export default removeQuery;

function setParams(key: "filters" | "keyword" | "sort", value: string) {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);
  return searchParams.toString();
}

export default setParams;

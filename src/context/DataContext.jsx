// src/context/DataContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // search text
  const [searchTerm, setSearchTerm] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(5000);

  const fetchAllProducts = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Could not load products");
    }
  }, []);

  // unique helper
  const getUniqueValues = (items, getter) => {
    if (!items) return [];
    const vals = items.map(getter).filter(Boolean);
    return [...new Set(vals)];
  };

  // raw category names from API
  const categoryOnlyData = getUniqueValues(
    data || [],
    (item) => item.category?.name
  );

  // simple "brand" list derived from first word of title (example only)
  const brandList = getUniqueValues(
    data || [],
    (item) => item.title?.split(" ")[0]
  );

  // apply all filters step‑by‑step [web:598][web:599]
  const filteredProducts =
    data?.filter((p) => {
      // search
      if (
        searchTerm &&
        !p.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // category
      if (
        selectedCategory !== "ALL" &&
        p.category?.name !== selectedCategory
      ) {
        return false;
      }

      // brand (first word)
      const brand = p.title?.split(" ")[0];
      if (selectedBrand !== "ALL" && brand !== selectedBrand) {
        return false;
      }

      // price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }) ?? [];

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setSelectedBrand("ALL");
    setMaxPrice(5000);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        error,
        // filter state
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        maxPrice,
        setMaxPrice,
        resetFilters,
        // derived lists
        categoryOnlyData,
        brandList,
        // result
        filteredProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);

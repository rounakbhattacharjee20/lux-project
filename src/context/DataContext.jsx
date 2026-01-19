// src/context/DataContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export const DataContext = createContext(null);

const API_BASE_URL = "http://localhost:5000/api";

export const DataProvider = ({ children }) => {
  // ==================
  // STATE
  // ==================
  const [data, setData] = useState(null); // all products
  const [categories, setCategories] = useState([]); // from DB
  const [subcategories, setSubcategories] = useState([]); // from DB
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // search text
  const [searchTerm, setSearchTerm] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubcategory, setSelectedSubcategory] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(5000);

  // ==================
  // FETCH CATEGORIES
  // ==================
  const fetchCategories = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/categories`);
      const json = await res.json();
      if (json.success) {
        setCategories(json.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Could not load categories");
    }
  }, []);

  // ==================
  // FETCH SUBCATEGORIES
  // ==================
  const fetchSubcategories = useCallback(async (categoryName) => {
    try {
      setError(null);
      setSubcategories([]); // clear previous
      const res = await fetch(
        `${API_BASE_URL}/categories/${categoryName}/subcategories`
      );
      const json = await res.json();
      if (json.success) {
        setSubcategories(json.data);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setError("Could not load subcategories");
    }
  }, []);

  // ==================
  // FETCH ALL PRODUCTS
  // ==================
  const fetchAllProducts = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Could not load products");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================
  // FETCH PRODUCTS BY CATEGORY
  // ==================
  const fetchProductsByCategory = useCallback(async (categoryName) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products/category/${categoryName}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
      setError("Could not load products");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================
  // FETCH PRODUCTS BY CATEGORY & SUBCATEGORY
  // ==================
  const fetchProductsByCategoryAndSubcategory = useCallback(
    async (categoryName, subcategoryId) => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/products/category/${categoryName}/subcategory/${subcategoryId}`
        );
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==================
  // SEARCH PRODUCTS
  // ==================
  const searchProducts = useCallback(async (searchTerm) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products/search/${searchTerm}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Could not search products");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================
  // HELPER FUNCTIONS
  // ==================
  const getUniqueValues = (items, getter) => {
    if (!items) return [];
    const vals = items.map(getter).filter(Boolean);
    return [...new Set(vals)];
  };

  // Brand list from product data
  const brandList = getUniqueValues(data || [], (item) => item.prodm_color);

  // ==================
  // APPLY FILTERS - SHOW ALL PRODUCTS FOR NOW
  // ==================
  const filteredProducts = data ?? [];

  // ==================
  // RESET FILTERS
  // ==================
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setSelectedSubcategory("ALL");
    setSelectedBrand("ALL");
    setMaxPrice(5000);
  };

  // ==================
  // CONTEXT VALUE
  // ==================
  return (
    <DataContext.Provider
      value={{
        // data
        data,
        setData,
        categories,
        subcategories,
        error,
        loading,

        // fetch functions
        fetchAllProducts,
        fetchCategories,
        fetchSubcategories,
        fetchProductsByCategory,
        fetchProductsByCategoryAndSubcategory,
        searchProducts,

        // filter state
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedBrand,
        setSelectedBrand,
        maxPrice,
        setMaxPrice,
        resetFilters,

        // derived lists
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

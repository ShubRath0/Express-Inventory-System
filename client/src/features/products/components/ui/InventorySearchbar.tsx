import { SearchBar } from "@/components";
import { setSearchTerm } from "@/features/products/state";
import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const InventorySearchbar = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <SearchBar
      onChange={(searchTerm) => setSearchInput(searchTerm)}
      placeholder="Search Items"
      className="w-[20%]"
    />
  );

};
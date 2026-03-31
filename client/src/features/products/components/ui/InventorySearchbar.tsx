import { SearchBar } from "@/components";
import { setSearchTerm } from "@/features/products/state";
import { useDispatch } from "react-redux";

export const InventorySearchbar = () => {
    const dispatch = useDispatch();

    return (
        <SearchBar
            onChange={(searchTerm) => dispatch(setSearchTerm(searchTerm))}
            placeholder="Search Items"
            className="w-[20%]"
        />
    );

};
import { SearchBar } from "@/components";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../state";

export const InventorySearchbar = () => {
    const dispatch = useDispatch();

    return (
        <SearchBar
            onChange={(searchTerm) => dispatch(setSearchTerm(searchTerm))}
            placeholder="Search Items"
            className="w-[20%]"
        />
    )

}
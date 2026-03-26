import { SearchBar } from "@/components";
import { useFilterContext } from "../../context/FilterProvider";

export const InventorySearchbar = () => {
    const { setSearchTerm } = useFilterContext();

    return (
        <SearchBar
            onChange={setSearchTerm}
            placeholder="Search Items"
            className="w-[20%]"
        />
    )

}
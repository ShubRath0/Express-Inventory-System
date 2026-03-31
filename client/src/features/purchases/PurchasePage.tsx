import { ScrollContainer, SearchBar, SectionHeader } from "@/components";
import { PurchaseOrderTable } from "@/features/purchases/components";
import { CreatePurchaseOrderBtn } from "@/features/purchases/components/CreatePurchaseOrderBtn";
import { CreatePurchaseOrderModal } from "@/features/purchases/components/CreatePurchaseOrderModal";
import { setSearchTerm } from "@/features/purchases/state";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";

export const PurchasePage = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col h-full p-4 overflow-y-auto bg-background">
            <ScrollContainer>

                <SectionHeader title="Purchase Orders" />

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.3, ease: "backInOut" }}
                >
                    <section className="w-full flex justify-between items-center">
                        <SearchBar
                            onChange={(search) => dispatch(setSearchTerm(search))}
                            placeholder="Search Orders"
                            className="w-[30%]"
                        />
                        <CreatePurchaseOrderBtn />
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3, ease: "backInOut" }}
                >
                    <PurchaseOrderTable />
                </motion.div>
            </ScrollContainer>

            <section>
                <CreatePurchaseOrderModal />
            </section>
        </div>

    );
};
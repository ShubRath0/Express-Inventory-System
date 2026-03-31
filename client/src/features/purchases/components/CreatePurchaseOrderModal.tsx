import { GenericModal } from "@/components";
import { CreatePurchaseOrderForm } from "@/features/purchases/components/CreatePurchaseOrderForm";
import { useModalActions } from "@/hooks/useModalActions";

export const CreatePurchaseOrderModal = () => {

    const { activeModal, closeModal } = useModalActions();

    return (
        <GenericModal
            title="Create a PO"
            isOpen={activeModal === 'create'}
            onOpenChange={closeModal}
        >
            {() => (
                <CreatePurchaseOrderForm onSubmit={() => { }} />
            )}
        </GenericModal>
    );
};
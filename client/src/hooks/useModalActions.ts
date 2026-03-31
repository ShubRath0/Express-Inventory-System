import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { closeModal, setModal, type Modal } from "@/state";

export const useModalActions = () => {
    const dispatch = useAppDispatch();
    const { activeData, activeModal } = useAppSelector(state => state.modals);

    const open = (modal: Modal, data?: any) => {
        dispatch(setModal({ modal, data }));
    };

    const close = () => {
        dispatch(closeModal());
    };

    return { openModal: open, closeModal: close, activeData, activeModal };
};
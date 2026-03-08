import { Modal, ModalBody, ModalContent, ModalHeader, type ModalProps } from "@heroui/react"

interface GenericModalProps extends Omit<ModalProps, "children"> {
    title: string;
    children: (onClose: () => void) => React.ReactNode;
}

export const GenericModal = ({
    title,
    children,
    ...props
}: GenericModalProps) => {
    return (
        <Modal {...props}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            {children(onClose)}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
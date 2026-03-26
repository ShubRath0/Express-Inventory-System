import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"

export type GenericAlertProps = {
    title?: string
    message: string
    options: React.ReactNode[]
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export const GenericAlert = ({
    title,
    message,
    options,
    isOpen,
    onOpenChange,
}: GenericAlertProps) => {
    return (
        <div className="w-full">
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                placement="center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title || "Confirm Action"}
                            </ModalHeader>
                            <ModalBody>
                                <p>{message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex w-full justify-end gap-2">
                                    {options}
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>

            </Modal>
        </div>
    )
}
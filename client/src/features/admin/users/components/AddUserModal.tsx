import { SelectOptions } from "@/features/admin/users/components/SelectItems";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export const AddUser = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create new user</ModalHeader>
            <ModalBody>
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
              <Input placeholder="Email" />
              <Input placeholder="Password" />
              <SelectOptions />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="shadow">
                Submit
              </Button>
              <Button onPress={onClose}>Cancel</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

import React, { useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { ThemeContext } from "@/contexts";

export interface MetamaskInstallModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MetamaskInstallModal({
  isOpen,
  onOpenChange,
}: MetamaskInstallModalProps) {
  const themeContext = useContext(ThemeContext);

  const closeModalHandler = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      className={`${themeContext.theme} text-foreground`}
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader>Install Metamask Browser Extension</ModalHeader>
        <ModalBody>
          <Image
            alt={"Metamask Icon"}
            src={"/MetaMaskFox.svg"}
            width={100}
            height={100}
            className={"metamask-icon"}
          />
          <p className="metamask-modal-text">
            You have to install Metamask browser extension to use the
            application .
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModalHandler}>
            Close
          </Button>
          <Button
            color="primary"
            variant="shadow"
            as={Link}
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          >
            Install Extension
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

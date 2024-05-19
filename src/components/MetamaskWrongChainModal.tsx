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

export interface MetamaskWringChainModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MetamaskWrongChainModal({
  isOpen,
  onOpenChange,
}: MetamaskWringChainModalProps) {
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
        <ModalHeader>
          Please Select Your Ethereum Wallet in Metamask
        </ModalHeader>
        <ModalBody>
          <section>
            <h2 className="step-text">Step 1</h2>
            <Image
              alt="Tutorial step 1"
              src={"/metamaskAccountChangeTutorial/tutorial_img.png"}
              className={"tutorial-image"}
              width={400}
              height={400}
            />
          </section>
          <section>
            <h2 className="step-text">Step 2</h2>
            <Image
              alt="Tutorial step 2"
              src={"/metamaskAccountChangeTutorial/tutorial_image2.png"}
              className={"tutorial-image"}
              width={400}
              height={400}
            />
          </section>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

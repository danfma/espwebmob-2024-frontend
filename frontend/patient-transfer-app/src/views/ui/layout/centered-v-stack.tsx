import {VStack} from "@chakra-ui/react";
import {ReactNode} from "react";

export interface CenteredVStackProps {
  children?: ReactNode;
}

export function CenteredVStack (props: CenteredVStackProps) {
  const {children} = props;

  return (
    <VStack w="100vw" h="100vh" justifyContent="center" bg="gray.solid">
      {children}
    </VStack>
  );
}

import {PatientTransferText} from "@app/views/ui/visual/patient-transfer-text.tsx";
import {Box, Flex, VStack} from "@chakra-ui/react";
import {Link} from "react-router";

export function IndexPage () {
  return (
    <VStack>
      <Flex w="100%" gap={2} px={5} py={5}>
        <PatientTransferText/>
        <Box flexGrow={1}/>
        <Link to="/login">Entrar</Link>
      </Flex>
    </VStack>
  );
}

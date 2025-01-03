import {Box} from "@chakra-ui/react";
import {UnfoldHorizontal} from "lucide-react";

export function PatientTransferText () {
  return (
    <Box as="span" textTransform="uppercase" fontWeight="bold" display="inline-flex" gap={2}>
      <Box as="span" color="gray.600">Patient</Box>
      <Box as={UnfoldHorizontal} display="inline-block" />
      <Box as="span" color="red.500">Transfer</Box>
    </Box>
  );
}

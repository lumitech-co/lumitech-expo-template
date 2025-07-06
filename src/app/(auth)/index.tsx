import { Box, Text } from "ui";
import React from "react";

export default function AuthScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text color="black" fontSize="title" fontWeight={500} fontFamily="Bold">
        Auth screen
      </Text>
    </Box>
  );
}

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "api";
import { Stack } from "expo-router";
import "lib/i18n";
import { useSelectToken } from "model";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ModalProvider } from "react-native-modalfy";
import { ReducedMotionConfig, ReduceMotion } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UnistylesProvider, UnistylesRegistry } from "react-native-unistyles";
import { Toaster } from "sonner-native";
import { breakpoints, DefaultTheme } from "themes";
import { modalStack } from "widgets/modals";

UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
  defaultTheme: DefaultTheme,
});

export default function RootLayout() {
  const token = useSelectToken();
  const isLoggedIn = !!token;

  return (
    <UnistylesProvider>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <KeyboardProvider>
        <GestureHandlerRootView style={styles.layout}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider stack={modalStack}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" redirect={isLoggedIn} />
                  <Stack.Screen name="(tabs)" redirect={!isLoggedIn} />
                </Stack>
              </ModalProvider>
            </QueryClientProvider>
            <Toaster position="top-center" />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </UnistylesProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

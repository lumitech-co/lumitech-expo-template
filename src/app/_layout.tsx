import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { UnistylesProvider, UnistylesRegistry } from "react-native-unistyles";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { ReducedMotionConfig, ReduceMotion } from "react-native-reanimated";
import { ModalProvider } from "react-native-modalfy";
import { Stack } from "expo-router";
import { DefaultTheme } from "themes";
import { breakpoints } from "themes";
import { modalStack } from "widgets/modals";
import { queryClient } from "api";
import { useSelectAuthentication } from "models";

UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
  defaultTheme: DefaultTheme,
});

export default function RootLayout() {
  const { accessToken } = useSelectAuthentication();

  return (
    <UnistylesProvider>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <KeyboardProvider>
        <GestureHandlerRootView style={styles.layout}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider stack={modalStack}>
                {accessToken ? (
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                ) : (
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                )}
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function NotFoundScreen() {
  const router = useRouter();
  const { theme } = useStyles();

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title,]}>
        Page Not Found
      </Text>
      <Text style={[styles.subtitle]}>
        The page you're looking for doesn't exist.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
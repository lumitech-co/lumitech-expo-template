import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Tabs } from 'expo-router';
import { IconName } from 'react-native-vector-icons';
import { Icon } from '../../shared/ui';
import { useTranslation } from 'react-i18next';

const tabIcons: Record<string, IconName> = {
  alerts: 'alerts',
  profile: 'account',
};

export default function TabLayout() {
  const { theme, styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const titles: Record<string, string> = useMemo(
    () => ({
      alerts: t('screens.alerts'),
      profile: t('screens.account'),
    }),
    [t],
  );

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.black,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItemStyle,
        lazy: true,
        tabBarLabel: () => (
          <Text style={styles.text}>{titles[route.name]}</Text>
        ),
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? 'black' : 'gray_400';

          return (
            <Icon name={tabIcons[route.name]} size={22} color={iconColor} />
          );
        },
      })}
      backBehavior="history">
      <Tabs.Screen
        name="alerts"
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false }}
      />
    </Tabs>
  );
}

const stylesheet = createStyleSheet(theme => ({
  tabBarItemStyle: {
    height: 42,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabBarBadgeStyle: {
    top: -8,
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 14,
    width: 16,
    height: 16,
    borderRadius: 8,
    minWidth: 0,
  },
  text: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    fontFamily: theme.fonts.Medium,
    color: theme.colors.black,
  },
}));
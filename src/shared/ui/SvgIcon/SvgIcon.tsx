import React from "react";
import type { SvgProps } from "react-native-svg";
import { useStyles } from "react-native-unistyles";
import { Colors } from "themes";

const DEFAULT_ICON_SIZE = 24;

export interface SvgIconProps extends Omit<SvgProps, "color"> {
  icon: React.FC<SvgProps>;
  size?: number;
  color?: keyof typeof Colors;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  icon: IconComponent,
  size = DEFAULT_ICON_SIZE,
  color = "black_950",
  ...rest
}) => {
  const { theme } = useStyles();

  return (
    <IconComponent
      width={size}
      height={size}
      color={theme.colors[color]}
      {...rest}
    />
  );
};

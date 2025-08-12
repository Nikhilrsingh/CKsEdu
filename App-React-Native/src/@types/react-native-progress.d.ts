declare module "react-native-progress/Circle" {
  import { Component } from "react";
  import { ViewStyle, TextStyle, StyleProp } from "react-native";

  export interface ProgressCircleProps {
    progress?: number;
    size?: number;
    thickness?: number;
    color?: string;
    unfilledColor?: string;
    borderWidth?: number;
    showsText?: boolean;
    formatText?: () => string;
    textStyle?: StyleProp<TextStyle>;
    strokeCap?: "butt" | "round" | "square";
    indeterminate?: boolean;
    style?: StyleProp<ViewStyle>;
  }

  export default class ProgressCircle extends Component<ProgressCircleProps> {}
}

import React from "react";
import { Button, ActivityIndicator } from "react-native";

type ButtonWithLoaderProps = {
  isLoading: boolean;
  onPress: () => void;
  title: string;
};

const ButtonWithLoader = ({ isLoading, onPress, title }: ButtonWithLoaderProps) => {
  return isLoading ? <ActivityIndicator size="small" color="#007AFF" /> : <Button title={title} onPress={onPress} />;
};

export default ButtonWithLoader;

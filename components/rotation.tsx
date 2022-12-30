import React from "react";
import { StyleSheet, Button, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

export default function rotation() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const SIZE = 100.0;
  const handleRotation = (progress: Animated.SharedValue<number>) => {
    "worklet";
    return `${progress.value * Math.PI * 2}rad`;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  const animate = () => {
    progress.value = withRepeat(withTiming(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  };

  return (
    <>
      <Animated.View style={styles.container}>
        <Animated.View
          style={[
            {
              height: SIZE,
              width: SIZE,
              backgroundColor: "blue",
            },
            animatedStyle,
          ]}
        ></Animated.View>
      </Animated.View>
      <Button title="Animate" onPress={animate} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

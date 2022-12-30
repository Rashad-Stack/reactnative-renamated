import "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function Pangesture() {
  const translationX = useSharedValue(0);

  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event) => {},
      onActive: (event) => {
        translationX.value = event.translationX;
      },
      onEnd: (event) => {},
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.square, rStyle]}></Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
    borderRadius: 20,
  },
});

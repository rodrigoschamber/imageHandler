import React, { Component } from 'react';
import { Animated } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import southAmerica from '../assets/southAmerica.jpg';

export class ZoomBox extends Component {
  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1
  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: true }
  )
  onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }
  render() {
    return(
      <PinchGestureHandler
        onGestureEvent={this.onPinchGestureEvent}
        onHandlerStateChange={this.onPinchHandlerStateChange}>
        <Animated.View
          style={[{
            height: hp('100%'),
            width: wp('100%'),
            backgroundColor: '#ffffff'},
            {
              transform: [
                { perspective: 200 },
                { scale: this.scale },
              ],
            },
          ]}
        >
        <DraggableBox/>
      </Animated.View>
      </PinchGestureHandler>
    )
  }
}

export class DraggableBox extends Component {
  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
  lastOffset = { x: 0, y: 0 }
  onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY,
        },
      },
    ],
    { useNativeDriver: true }
  )
  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX
      this.lastOffset.y += event.nativeEvent.translationY
      this.translateX.setOffset(this.lastOffset.x)
      this.translateX.setValue(0)
      this.translateY.setOffset(this.lastOffset.y)
      this.translateY.setValue(0)
    }
  }
  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.Image
          source={southAmerica}
          style={[
            {
              width: wp('100%'),
              height: hp('65.96%'),
              alignSelf: 'center',
              backgroundColor: 'plum',
            },
            {
              transform: [
                { translateX: this.translateX },
                { translateY: this.translateY },
              ],
            },
            this.props.boxStyle,
          ]}
        />
      </PanGestureHandler>
    );
  }
}

export default class ImageHandler extends Component {
  render() {
    return (
      <ZoomBox/>
    );
  }
}
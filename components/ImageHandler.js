import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
  
export default class ImageHandler extends Component {
  panRef = React.createRef();
  pinchRef = React.createRef();
  static propTypes = {
    imageUri: PropTypes.any.isRequired,
  }
  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1
  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: true }
  )
  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
  lastOffset = { x: 0, y: 0 }
  onPanGestureEvent = Animated.event(
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
  onPanHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX
      this.lastOffset.y += event.nativeEvent.translationY
      this.translateX.setOffset(this.lastOffset.x)
      this.translateX.setValue(0)
      this.translateY.setOffset(this.lastOffset.y)
      this.translateY.setValue(0)
    }
  }
  onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }
  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this.onPinchGestureEvent}
        onHandlerStateChange={this.onPinchHandlerStateChange}
        ref={this.pinchRef}
        simultaneousHandlers={this.panRef}
      >
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
          <PanGestureHandler
            {...this.props}
            onGestureEvent={this.onPanGestureEvent}
            onHandlerStateChange={this.onPanHandlerStateChange}
            ref={this.panRef}
            simultaneousHandlers={this.pinchRef}
          >
            <Animated.Image
              source={this.props.imageUri}
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
        </Animated.View>
      </PinchGestureHandler>
    )
  }
}
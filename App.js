import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ImageHandler from './components/ImageHandler';
import southAmerica from './assets/southAmerica.jpg'

export default function App() {
  return (
    <ImageHandler
      containerStyle={{
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: '#ffffff'
      }}
      imageStyle={{
        width: wp('100%'),
        height: hp('65.96%'),
        alignSelf: 'center',
        backgroundColor: 'plum',
      }}
      imageUri={southAmerica}
    />
  )
}

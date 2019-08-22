import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ImageHandler from './components/ImageHandler';
import southAmerica from './assets/southAmerica.jpg'

export default function App() {
  return (
    <ImageHandler
      containerStyle={{
        backgroundColor: '#ffffff',
        height: hp('100%'),
        width: wp('100%'),
      }}
      imageStyle={{
        alignSelf: 'center',
        backgroundColor: 'plum',
        height: hp('65.96%'),
        width: wp('100%'),
      }}
      imageUri={southAmerica}
    />
  )
}

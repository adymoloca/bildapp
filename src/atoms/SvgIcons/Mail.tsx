import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/mail background" fill="none" d="M0 0h24v24H0z" />
    <Path
      data-name="Combined Shape"
      d="M19 20H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3ZM4 8.868V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.868l-6.336 4.225a3 3 0 0 1-3.328 0ZM5 6a1 1 0 0 0-.887.54l7.332 4.889a1 1 0 0 0 1.109 0l7.334-4.889A1 1 0 0 0 19 6Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

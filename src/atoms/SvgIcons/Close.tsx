import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/close background" fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M5.293 5.293a1 1 0 0 0 0 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 1 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 0Z"
      fill={props.color || '#fff'}
    />
  </Svg>
);

export default SvgComponent;

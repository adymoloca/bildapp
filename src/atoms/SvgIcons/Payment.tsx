import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/payment background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      d="M19 20H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3ZM4 10v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7Zm1-4a1 1 0 0 0-.993.884L4 7v1h16V7a1 1 0 0 0-.884-.993L19 6Zm8 10H7a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

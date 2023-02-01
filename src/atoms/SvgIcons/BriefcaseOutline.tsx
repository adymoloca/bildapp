import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/briefcase background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      data-name="Combined Shape"
      d="M19 22H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h2.8l.446-1.114A2.986 2.986 0 0 1 11.031 2h1.938a2.987 2.987 0 0 1 2.785 1.885L16.2 5H19a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3ZM4 13.83V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5.17a3.017 3.017 0 0 1-1 .17h-4.268A2.007 2.007 0 0 1 13 15h-2a2.006 2.006 0 0 1-1.733-1H5a3.015 3.015 0 0 1-1-.17ZM11 11h2a2.007 2.007 0 0 1 1.733 1H19a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4.267A2.008 2.008 0 0 1 11 11Zm.031-7a1 1 0 0 0-.929.629L9.954 5h4.091l-.145-.371A.994.994 0 0 0 12.969 4Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

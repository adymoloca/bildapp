import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20.193}
    height={22.059}
    {...props}>
    <G
      data-name="Group 1426"
      fill="none"
      stroke={props.color || '#353f4e'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path
        data-name="Path 1496"
        d="M19.096 15.03v-8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4a2 2 0 0 0-1 1.73v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z"
      />
      <Path data-name="Path 1497" d="m1.366 5.99 8.73 5.05 8.73-5.05" />
      <Path data-name="Line 110" d="M10.096 21.012v-10.08" />
    </G>
  </Svg>
);

export default SvgComponent;

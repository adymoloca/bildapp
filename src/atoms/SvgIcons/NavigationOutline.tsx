import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
    <Path
      data-name="navigation (3)"
      d="M1 9.526 19 1l-8.526 18-1.895-7.579Z"
      fill="none"
      stroke={props.color || '#08f'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

export default SvgComponent;

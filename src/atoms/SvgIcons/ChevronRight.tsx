import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/chevron_forward background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      data-name="Vector 474 (Stroke)"
      d="M8.043 17.793 13.836 12 8.043 6.207a1 1 0 0 1 1.414-1.414l5.793 5.793a2 2 0 0 1 0 2.828l-5.793 5.793a1 1 0 0 1-1.414-1.414Z"
      fill={props.color || '#cdd1da'}
    />
  </Svg>
);

export default SvgComponent;

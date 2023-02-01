import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg
    data-name="payments_black_24dp (1)"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    {...props}>
    <Path data-name="Rectangle 576" fill="none" d="M0 0h24v24H0z" />
    <Path
      data-name="Path 1387"
      d="M19 14V6a2.006 2.006 0 0 0-2-2H3a2.006 2.006 0 0 0-2 2v8a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2Zm-2 0H3V6h14Zm-7-7a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm13 0v11a2.006 2.006 0 0 1-2 2H4v-2h17V7Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

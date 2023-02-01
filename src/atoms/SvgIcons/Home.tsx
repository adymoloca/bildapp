import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/home background" fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M19 21.964H5a3 3 0 0 1-3-3V11.3a3 3 0 0 1 .993-2.23l7-6.3a3 3 0 0 1 4.014 0l7 6.3A3 3 0 0 1 22 11.3v7.664a3 3 0 0 1-3 3Zm-8-10h2a3 3 0 0 1 3 3v5h3a1 1 0 0 0 1-1V11.3a1 1 0 0 0-.331-.743l-7-6.3a1 1 0 0 0-1.337 0l-7 6.3A1 1 0 0 0 4 11.3v7.664a1 1 0 0 0 1 1h3v-5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v5h4v-5a1 1 0 0 0-1-1Z"
      fill={props.color || '#0bcdc8'}
    />
  </Svg>
);

export default SvgComponent;

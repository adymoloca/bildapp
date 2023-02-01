import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      data-name="Bold 2px/person background"
      fill="none"
      d="M0 0H24V24H0z"
    />
    <G fill={props.color || '#353f4e'}>
      <Path
        data-name="Vector 631 (Stroke)"
        d="M2 6v1a1 1 0 01-2 0V6a6 6 0 016-6h6a6 6 0 016 6v1a1 1 0 01-2 0V6a4 4 0 00-4-4H6a4 4 0 00-4 4z"
        transform="translate(3 2) translate(0 12)"
      />
      <Path
        data-name="Combined Shape"
        d="M5 10a5 5 0 115-5 5.006 5.006 0 01-5 5zm0-8a3 3 0 103 3 3 3 0 00-3-3z"
        transform="translate(3 2) translate(4)"
      />
    </G>
  </Svg>
);

export default SvgComponent;

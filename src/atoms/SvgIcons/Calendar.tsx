import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Bold 2px/calendar background"
        fill="none"
        d="M0 0H24V24H0z"
      />
      <Path
        data-name="Combined Shape"
        d="M17 20H3a3 3 0 01-3-3V5a3 3 0 013-3h1V1a1 1 0 012 0v1h8V1a1 1 0 012 0v1h1a3 3 0 013 3v12a3 3 0 01-3 3zM2 10v7a1 1 0 001 1h14a1 1 0 001-1v-7zm1-6a1 1 0 00-1 1v3h16V5a1 1 0 00-1-1h-1v1a1 1 0 01-2 0V4H6v1a1 1 0 01-2 0V4z"
        transform="translate(2 2)"
        fill={props.color || '#353f4e'}
      />
    </Svg>
  );
}

export default SvgComponent;

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
        d="M16 20H2a2 2 0 01-2-2v-2.5A4.505 4.505 0 014.5 11h9a4.505 4.505 0 014.5 4.5V18a2 2 0 01-2 2zM9 9a4.5 4.5 0 114.5-4.5A4.505 4.505 0 019 9z"
        transform="translate(3 2)"
        fill={props.color || '#353f4e'}
        opacity={0.38}
      />
    </Svg>
  );
}

export default SvgComponent;

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
      <Path data-name="Rectangle 666" fill="none" d="M0 0H24V24H0z" />
      <Path
        data-name="Path 1498"
        d="M5 10h14v2h2V6a2.006 2.006 0 00-2-2h-1V2h-2v2H8V2H6v2H5a1.991 1.991 0 00-1.99 2L3 20a2 2 0 002 2h7v-2H5zm0-4h14v2H5zm17.84 10.28l-.71.71-2.12-2.12.71-.71a1 1 0 011.41 0l.71.71a1 1 0 010 1.41zm-3.54-.7l2.12 2.12-5.3 5.3H14v-2.12z"
        fill={props.color || '#353f4e'}
      />
    </Svg>
  );
}

export default SvgComponent;

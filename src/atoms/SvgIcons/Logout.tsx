import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Bold 2px/logout background"
        fill="none"
        d="M0 0H24V24H0z"
      />
      <G fill={props.color || '#8f98a9'}>
        <Path
          d="M8.293.293a1 1 0 000 1.414L10.086 3.5H1a1 1 0 100 2h9.086L8.293 7.293a1 1 0 001.414 1.414L12.5 5.914a2 2 0 000-2.828L9.707.293a1 1 0 00-1.414 0z"
          transform="translate(3 2) translate(5 5.5)"
        />
        <Path
          data-name="Vector 587 (Stroke)"
          d="M3 0h6a3 3 0 013 3v1a1 1 0 01-2 0V3a1 1 0 00-1-1H3a1 1 0 00-1 1v14a1 1 0 001 1h6a1 1 0 001-1v-1a1 1 0 012 0v1a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3z"
          transform="translate(3 2)"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;

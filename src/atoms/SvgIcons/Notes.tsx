import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/left_align background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill={props.color || '#353f4e'}>
      <Path
        data-name="Vector 605 (Stroke)"
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z"
      />
      <Path
        data-name="Vector 606 (Stroke)"
        d="M4 9h10a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z"
      />
      <Path
        data-name="Vector 607 (Stroke)"
        d="M4 13h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z"
      />
      <Path
        data-name="Vector 608 (Stroke)"
        d="M4 17h10a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;

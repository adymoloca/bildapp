import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/check_all background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill={props.color || '#9099a8'}>
      <Path d="M16.707 8.707a1 1 0 0 0-1.414-1.414l-4.757 4.757 1.414 1.414Z" />
      <Path
        data-name="Subtract"
        d="m6.307 14.892-.014-.014-2.586-2.585a1 1 0 0 0-1.414 1.414l2.586 2.586a3 3 0 0 0 3.415.586Z"
      />
      <Path
        data-name="Vector 410 (Stroke)"
        d="m21.707 8.657-7.636 7.636a3 3 0 0 1-4.243 0l-2.585-2.586a1 1 0 0 1 1.414-1.414l2.586 2.586a1 1 0 0 0 1.414 0l7.636-7.636a1 1 0 0 1 1.414 1.414Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;

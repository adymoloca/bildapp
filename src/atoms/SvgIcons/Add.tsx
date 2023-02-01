import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G opacity={0.8}>
      <Path data-name="Bold 2px/add background" fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 0 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 0 0 0-2h-6V5a1 1 0 0 0-1-1Z"
        fill={props.color || '#8f98a9'}
      />
    </G>
  </Svg>
);

export default SvgComponent;

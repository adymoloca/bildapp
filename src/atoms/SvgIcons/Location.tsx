import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/location background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill={props.color || '#353f4e'}>
      <Path
        data-name="Combined Shape"
        d="M12 22.072a1.7 1.7 0 0 1-1.321-.634c-2.132-2.61-4.914-6.338-4.946-6.374l-.006-.008a7.946 7.946 0 0 1-1.762-5.021 8.038 8.038 0 1 1 14.312 5.016v.007l-.017.026c-.361.482-.771 1.025-1.187 1.571a187.67 187.67 0 0 1-3.748 4.784 1.7 1.7 0 0 1-1.325.633ZM12 4a6.042 6.042 0 0 0-6.035 6.035 5.963 5.963 0 0 0 1.323 3.77l.005.007c.117.145.229.3.339.446l.168.226c.392.52.791 1.045 1.186 1.561.791 1.034 1.956 2.54 3.014 3.848a181.27 181.27 0 0 0 3.022-3.854c.5-.658.924-1.213 1.188-1.563.066-.087.13-.175.195-.264.1-.136.2-.275.307-.408a5.963 5.963 0 0 0 1.323-3.77A6.042 6.042 0 0 0 12 4Z"
      />
      <Path
        data-name="Combined Shape"
        d="M12 13a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;

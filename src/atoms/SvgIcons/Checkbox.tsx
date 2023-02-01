import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgComponent = (props: any) => {
  if (props.selected) {
    return (
      <Svg  key="0"  xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
        <Path
          data-name="Path 1519"
          d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0ZM7.29 14.29 3.7 10.7a1 1 0 0 1 1.41-1.41L8 12.17l6.88-6.88a1 1 0 0 1 1.41 1.41L8.7 14.29a1 1 0 0 1-1.41 0Z"
          fill="#0bcdc8"
        />
      </Svg>
    );
  } else {
    return (
      <Svg key="1" xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <G data-name="Group 1694">
          <Path data-name="Rectangle 731" fill="none" d="M0 0h24v24H0z" />
        </G>
        <G data-name="Group 1695">
          <Path
            data-name="Path 1520"
            d="M12 2a10 10 0 1 0 10 10A9.991 9.991 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
            fill="#8f98a9"
          />
        </G>
      </Svg>
    );
  }
};

export default SvgComponent;

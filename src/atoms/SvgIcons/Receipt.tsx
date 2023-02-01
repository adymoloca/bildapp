import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/receipt background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill={props.color || '#353f4e'}>
      <Path
        data-name="Combined Shape"
        d="M19.995 21.867a.981.981 0 0 1-.634-.234L18 20.5l-1.4 1.049a1 1 0 0 1-1.2 0L14 20.5l-1.4 1.05a1 1 0 0 1-1.2 0L10 20.5l-1.4 1.05a1 1 0 0 1-1.2 0L6 20.5l-1.36 1.133a.981.981 0 0 1-.634.234 1.026 1.026 0 0 1-.7-.278.985.985 0 0 1-.306-.724V3.133a1.006 1.006 0 0 1 1-1 .982.982 0 0 1 .64.234L6 3.5l1.4-1.05a1 1 0 0 1 1.2 0L10 3.5l1.4-1.05a1 1 0 0 1 1.2 0L14 3.5l1.4-1.05a1 1 0 0 1 1.2 0L18 3.5l1.36-1.133a.982.982 0 0 1 .64-.234 1.006 1.006 0 0 1 1 1v17.73a1.006 1.006 0 0 1-1.005 1.004ZM14 18.5a1.987 1.987 0 0 1 1.2.4l.8.6.8-.6a2 2 0 0 1 2.2-.132V5.233a2 2 0 0 1-2.2-.131l-.8-.6-.8.6a2 2 0 0 1-2.4 0l-.8-.6-.8.6a2 2 0 0 1-2.4 0l-.8-.6-.8.6a2 2 0 0 1-2.2.131v13.535a2 2 0 0 1 2.2.132l.8.6.8-.6a2 2 0 0 1 2.4 0l.8.6.8-.6a1.984 1.984 0 0 1 1.2-.4Z"
      />
      <Path
        data-name="Vector 605 (Stroke)"
        d="M8 9h8a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Z"
      />
      <Path
        data-name="Vector 607 (Stroke)"
        d="M8 13h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;

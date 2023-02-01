import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/notification background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      d="M12 22a4 4 0 0 1-4-4H3.4a1.4 1.4 0 0 1-.976-2.414l1.03-.995a2.008 2.008 0 0 0 .61-1.444l-.01-3.153A7.973 7.973 0 1 1 20 9.97v3.2a1.987 1.987 0 0 0 .586 1.414l1 1a1.415 1.415 0 0 1-1 2.415H16A4.005 4.005 0 0 1 12 22Zm-2-4a2 2 0 1 0 4 0Zm2.03-14a5.971 5.971 0 0 0-5.971 5.988l.009 3.154A4.021 4.021 0 0 1 4.878 16h14.294A3.975 3.975 0 0 1 18 13.172V9.97A5.977 5.977 0 0 0 12.03 4Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

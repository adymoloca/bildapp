import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/phone background" fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M16.017 21.371a4.776 4.776 0 0 1-2.326-.609 26.882 26.882 0 0 1-6-4.585 26.882 26.882 0 0 1-4.585-6A4.791 4.791 0 0 1 2.8 6.15a6.67 6.67 0 0 1 2.7-3.276 2.327 2.327 0 0 1 3.035.446l.1.131 1.511 2.056a3.017 3.017 0 0 1 .354 2.925l-.087.191-.41.82a.82.82 0 0 0-.015.747l.11.2.145.241.07.109.016.025.2.292a10.231 10.231 0 0 0 1.055 1.231 9.758 9.758 0 0 0 1.516 1.258l.258.162.116.068.2.111a.743.743 0 0 0 .345.083.876.876 0 0 0 .3-.054l.1-.044.82-.41a3 3 0 0 1 2.942.146l.174.119 2.056 1.507a2.33 2.33 0 0 1 .578 3.141 7.02 7.02 0 0 1-2.2 2.179 5.355 5.355 0 0 1-2.772.817ZM6.762 4.5a.326.326 0 0 0-.178.053C4.722 5.758 4.013 7.676 4.861 9.216a24.943 24.943 0 0 0 4.248 5.547 24.943 24.943 0 0 0 5.547 4.248 2.8 2.8 0 0 0 1.368.349 4.051 4.051 0 0 0 3.3-2.073.328.328 0 0 0-.081-.442l-2.056-1.507a.992.992 0 0 0-.591-.194 1 1 0 0 0-.447.106l-.82.41a2.929 2.929 0 0 1-1.3.31 2.716 2.716 0 0 1-1.254-.3l-.258-.14a11.085 11.085 0 0 1-2.348-1.83 11.538 11.538 0 0 1-1.651-2.045l-.172-.292-.139-.263a2.822 2.822 0 0 1 .005-2.557l.41-.82a1 1 0 0 0-.088-1.033L7.026 4.634a.329.329 0 0 0-.264-.134Z"
      fill={props.color || '#353f4e'}
    />
  </Svg>
);

export default SvgComponent;

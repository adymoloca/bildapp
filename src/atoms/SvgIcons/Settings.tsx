import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/settings background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill={props.color || '#353f4e'}>
      <Path
        data-name="Combined Shape"
        d="M11.379 23a2 2 0 0 1-1.9-1.367l-.384-1.163a2.312 2.312 0 0 0-1.1-1.256 8.844 8.844 0 0 1-.233-.135 2.306 2.306 0 0 0-1.641-.327L4.917 19a2 2 0 0 1-2.133-.959l-.621-1.079a2 2 0 0 1 .232-2.327l.815-.919a2.306 2.306 0 0 0 .538-1.58v-.271a2.307 2.307 0 0 0-.538-1.581l-.815-.919a2 2 0 0 1-.232-2.327l.621-1.075A2 2 0 0 1 4.917 5l1.2.246a2.31 2.31 0 0 0 1.641-.328c.077-.046.155-.091.233-.134A2.314 2.314 0 0 0 9.095 3.53l.387-1.163A2 2 0 0 1 11.379 1h1.242a2 2 0 0 1 1.9 1.367l.384 1.163a2.314 2.314 0 0 0 1.1 1.257c.078.043.157.088.233.134a2.311 2.311 0 0 0 1.641.328L19.082 5a2 2 0 0 1 2.133.959l.621 1.076a2 2 0 0 1-.236 2.326l-.814.919a2.311 2.311 0 0 0-.538 1.581v.271a2.309 2.309 0 0 0 .538 1.58l.814.919a2 2 0 0 1 .236 2.327l-.621 1.076a2 2 0 0 1-2.133.966l-1.2-.246a2.306 2.306 0 0 0-1.641.327 8.844 8.844 0 0 1-.233.135 2.312 2.312 0 0 0-1.1 1.256l-.387 1.163a2 2 0 0 1-1.9 1.365Zm-2.59-5.636c.059.035.117.068.176.1a4.308 4.308 0 0 1 2.03 2.373L11.379 21h1.242l.387-1.163a4.308 4.308 0 0 1 2.026-2.372l.176-.1a4.306 4.306 0 0 1 3.072-.572l1.2.247.621-1.075-.815-.92a4.3 4.3 0 0 1-1.04-2.945v-.208a4.3 4.3 0 0 1 1.041-2.939l.815-.919-.621-1.076-1.2.246a4.3 4.3 0 0 1-3.071-.571 3.44 3.44 0 0 0-.176-.1 4.3 4.3 0 0 1-2.026-2.372L12.621 3h-1.242l-.384 1.163a4.3 4.3 0 0 1-2.03 2.371l-.176.1a4.3 4.3 0 0 1-3.071.571l-1.2-.246-.623 1.079.815.919A4.3 4.3 0 0 1 5.752 11.9v.208a4.3 4.3 0 0 1-1.041 2.939l-.816.916.621 1.075 1.2-.247a3.978 3.978 0 0 1 .8-.08 4.453 4.453 0 0 1 2.273.653Z"
      />
      <Path
        data-name="Combined Shape"
        d="M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;
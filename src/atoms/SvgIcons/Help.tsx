import * as React from "react"
import Svg, { Path, G, Circle } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/help background" fill="none" d="M0 0h24v24H0z" />
    <G transform="translate(2 2)" fill={props.color || '#353f4e'}>
      <Path
        data-name="Combined Shape"
        d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Z"
      />
      <Circle
        data-name="Ellipse 190"
        cx={1}
        cy={1}
        r={1}
        transform="translate(9 15)"
      />
      <Path
        data-name="Ellipse 191 (Stroke)"
        d="M8.113 7.333a1 1 0 1 1-1.886-.666A4 4 0 1 1 11 11.874V13a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1 2 2 0 1 0-1.887-2.667Z"
      />
    </G>
  </Svg>
)

export default SvgComponent

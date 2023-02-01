import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/lock background" fill="none" d="M0 0h24v24H0z" />
    <G fill={props.color || "#353f4e"}>
      <Path
        data-name="Combined Shape"
        d="M17 22H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3V7a5 5 0 1 1 10 0v1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3ZM7 10a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm5-6a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3Z"
      />
      <Path d="M14 14a2 2 0 1 0-3 1.732V17a1 1 0 0 0 2 0v-1.268A2 2 0 0 0 14 14Z" />
    </G>
  </Svg>
)

export default SvgComponent

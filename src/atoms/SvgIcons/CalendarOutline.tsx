import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/event_scheduled background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <G fill="#ff9d36">
      <Path
        data-name="Combined Shape"
        d="M19 22H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 2 0v1h8V3a1 1 0 0 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3ZM5 6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1v1a1 1 0 0 1-2 0V6H8v1a1 1 0 0 1-2 0V6Z"
      />
      <Path
        data-name="Vector 408 (Stroke)"
        d="m16.707 11.707-5 5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 0 1 1.414-1.414L11 14.586l4.293-4.293a1 1 0 0 1 1.414 1.414Z"
      />
    </G>
  </Svg>
)

export default SvgComponent

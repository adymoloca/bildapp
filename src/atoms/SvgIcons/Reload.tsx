import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/reload background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      d="M12 4a7.846 7.846 0 0 1 6.182 2.993h-1.679a1 1 0 0 0-.006 2L19.94 9a1 1 0 0 0 .116 0h.444a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v1.449A9.83 9.83 0 0 0 12 2a10 10 0 1 0 8.9 14.445 1 1 0 1 0-1.791-.89A7.9 7.9 0 0 1 12 20a8 8 0 0 1 0-16Z"
      fill="#0bcdc8"
    />
  </Svg>
)

export default SvgComponent

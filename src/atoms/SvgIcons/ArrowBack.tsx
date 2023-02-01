import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ArrowBack = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      data-name="Bold 2px/arrow_backward background"
      fill="none"
      d="M0 0h24v24H0z"
    />
    <Path
      d="M10.707 19.207a1 1 0 0 1-1.414 0L3.5 13.414a2 2 0 0 1 0-2.828l5.793-5.793a1 1 0 1 1 1.414 1.414L5.914 11H20a1 1 0 0 1 0 2H5.914l4.793 4.793a1 1 0 0 1 0 1.414Z"
      fill="#353f4e"
    />
  </Svg>
)

export default ArrowBack

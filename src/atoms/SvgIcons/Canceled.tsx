import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/stop background" fill="none" d="M0 0h24v24H0z" />
    <Path
      data-name="Combined Shape"
      d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10ZM5.68 7.094A7.926 7.926 0 0 0 4 12a8.009 8.009 0 0 0 8 8 7.922 7.922 0 0 0 4.906-1.68ZM12 4a7.926 7.926 0 0 0-4.906 1.68L18.32 16.906A7.922 7.922 0 0 0 20 12a8.009 8.009 0 0 0-8-8Z"
      fill={props.color || "#353f4e"}
    />
  </Svg>
)

export default SvgComponent

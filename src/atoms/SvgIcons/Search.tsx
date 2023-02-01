import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...props}>
    <Path
      d="M.058 8.455a7.481 7.481 0 0 0 4.669 5.812 7.335 7.335 0 0 0 7.307-1.178l4.631 4.681a.775.775 0 0 0 1.1 0 .8.8 0 0 0 0-1.125l-4.631-4.681a7.507 7.507 0 0 0 1.49-6.336A7.43 7.43 0 0 0 6.033.136 7.514 7.514 0 0 0 .058 8.455Zm13.166-1.853a5.955 5.955 0 0 1-3.316 5.992 5.814 5.814 0 0 1-6.683-1.181A6 6 0 0 1 2.11 4.638a5.87 5.87 0 0 1 11.146 1.987Z"
      fill="#8f98a9"
    />
  </Svg>
)

export default SvgComponent
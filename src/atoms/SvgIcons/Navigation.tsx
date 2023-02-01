import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Navigation(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}
    >
      <Path
        data-name="navigation (2)"
        d="M3 11l19-9-9 19-2-8z"
        transform="translate(-3 -2)"
        fill="#0bcdc8"
      />
    </Svg>
  )
}

export default Navigation

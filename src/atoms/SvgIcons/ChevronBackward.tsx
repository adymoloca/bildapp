import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChevronBackward(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        data-name="Bold 2px/chevron_backward background"
        fill="none"
        d="M0 0H24V24H0z"
      />
      <Path
        data-name="Vector 474 (Stroke)"
        d="M-1.707.293L-7.5 6.086-13.293.293a1 1 0 00-1.414 0 1 1 0 000 1.414L-8.914 7.5a2 2 0 002.828 0l5.793-5.793a1 1 0 000-1.414 1 1 0 00-1.414 0z"
        transform="rotate(90 -1.75 17.75)"
        fill="#353f4e"
      />
    </Svg>
  )
}

export default ChevronBackward

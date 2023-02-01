import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChevronLeft(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.086}
      height={15}
      viewBox="0 0 18.086 15"
      {...props}
    >
      <Path
        d="M7.793 14.707a1 1 0 01-1.414 0L.586 8.914a2 2 0 010-2.828L6.379.293a1 1 0 111.414 1.414L3 6.5h14.086a1 1 0 010 2H3l4.793 4.793a1 1 0 010 1.414z"
        fill="#353f4e"
      />
    </Svg>
  )
}

export default ChevronLeft

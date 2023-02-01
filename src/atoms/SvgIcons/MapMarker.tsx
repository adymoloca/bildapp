import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function MapMarker(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14.986}
      height={20.8}
      viewBox="0 0 14.986 20.8"
      {...props}
    >
      <G data-name="Group 967">
        <Path
          data-name="Path 1233"
          d="M1138.641 715.808a7.452 7.452 0 00-7.493 7.68c0 2.979 2.3 8.861 6.876 12.89a.957.957 0 001.245 0c4.569-4.029 6.864-9.911 6.864-12.89a7.45 7.45 0 00-7.492-7.68zm0 11.779a4.213 4.213 0 114.212-4.213 4.212 4.212 0 01-4.212 4.213z"
          fill="#353f4e"
          transform="translate(-1131.148 -715.808)"
        />
      </G>
    </Svg>
  )
}

export default MapMarker

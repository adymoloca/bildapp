import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G opacity={0.8}>
      <Path
        data-name="Bold 2px/wallet background"
        fill="none"
        d="M0 0h24v24H0z"
      />
      <Path
        data-name="Combined Shape"
        d="M19 22H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v1.171A3.006 3.006 0 0 1 22 9v10a3 3 0 0 1-3 3ZM4 7.829V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2h-3a3 3 0 1 1 0-6h3V9a1 1 0 0 0-1-1H5a2.993 2.993 0 0 1-1-.171ZM17 13a1 1 0 0 0 0 2h3v-2ZM5 4a1 1 0 0 0 0 2h13V5a1 1 0 0 0-1-1Z"
        fill={props.color || '#0bcdc8'}
      />
    </G>
  </Svg>
)

export default SvgComponent

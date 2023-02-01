import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path data-name="Bold 2px/edit background" fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M3.789 21.211a1 1 0 0 1-.977-1.2l1.061-5.3a.99.99 0 0 1 .274-.51L14.536 3.807a3 3 0 0 1 4.243 0l1.41 1.415a3 3 0 0 1 0 4.243L9.8 19.857a1 1 0 0 1-.511.272l-5.3 1.06a1.022 1.022 0 0 1-.2.022ZM13.121 8.05 5.772 15.4l-.707 3.535 3.534-.706 7.35-7.35-2.828-2.829Zm3.536-3.121a1 1 0 0 0-.612.21l-.094.084-1.415 1.413 2.828 2.829 1.415-1.415a1 1 0 0 0 .082-1.321l-.083-.095-1.414-1.412a.992.992 0 0 0-.707-.293Z"
      fill={props.colors || '#0bcdc8'}
    />
  </Svg>
);

export default SvgComponent;

import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MinusIcon = (props) => (
  <Svg
    viewBox="0 0 512 512" // Define the coordinate system
    width={props.width || 24} // Default width
    height={props.height || 24} // Default height
    {...props}
  >
    <Path
      fill="none"
      stroke={"#323232"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={36}
      d="M400 256H112"
    />
  </Svg>
);

export default MinusIcon;

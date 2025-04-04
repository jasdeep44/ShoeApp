import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const PasswordIcon = (props) => (
  <Svg
    viewBox="0 0 512 512"
    width={props.width || 24} // Default width
    height={props.height || 24} // Default height
    {...props}
  >
    <Path
      fill="none"
      stroke={props.color || "currentColor"} // Use prop color or default to "currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z"
    />
    <Circle
      cx={256}
      cy={256}
      r={80}
      fill="none"
      stroke={props.color || "currentColor"} // Use prop color or default to "currentColor"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
  </Svg>
);

export default PasswordIcon;

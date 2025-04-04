import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddIcon = (props) => (
  <Svg
    fill="none" // Corrected fill attribute
    width={45}
    height={45}
    viewBox="0 0 24 24" // Corrected viewBox
    {...props}
  >
    <Path
      d="M12 5v14M5 12h14" // Corrected path data
      stroke="#323232" // Add stroke for visibility
      strokeWidth={2} // Add stroke width
    />
  </Svg>
);

export default AddIcon;

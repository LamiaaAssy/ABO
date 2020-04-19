import React from "react";
import Svg, { Defs, Path, Circle } from "react-native-svg";
import { calcWidth, calcHeight } from "../../Dimension";


const DonateWarn = props => (
    <Svg
        width={props.width ? calcWidth(props.width) : calcWidth(42.793)}
        height={props.height ? calcHeight(props.height) : calcHeight(42.793)}
        style={[{ transform: [{ rotate: (props.rotateDegree ? props.rotateDegree : 0) + 'deg' }] }, props.style]}
        viewBox="0 0 42.793 42.793"
        {...props}
    >
        <Defs></Defs>
        <Path
            fill="#dd1107"
            d="M21.4 0a21.4 21.4 0 1021.4 21.4A21.385 21.385 0 0021.4 0zm0 39.45A18.054 18.054 0 1139.45 21.4 18.043 18.043 0 0121.4 39.45z"
        />
        <Path
            fill="#dd1107"
            d="M1.672 0A1.672 1.672 0 000 1.672v10.765a1.672 1.672 0 003.343 0V1.672A1.672 1.672 0 001.672 0z"
            transform="translate(19.725 10.772)"
        />
        <Circle
            fill="#dd1107"
            cx={2.257}
            cy={2.257}
            r={2.257}
            transform="translate(19.14 26.926)"
        />
    </Svg>
);

export default DonateWarn;

import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
import { calcWidth, calcHeight } from "../../Dimension";


const Back = props => (
    <Svg
        width={props.width ? calcWidth(props.width) : calcWidth(21)}
        height={props.height ? calcHeight(props.height) : calcHeight(21)}
        style={[{ transform: [{ rotate: (props.rotateDegree ? props.rotateDegree : 0) + 'deg' }] }, props.style]}
        viewBox="0 0 21 21"
        {...props}
    >
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0H21V21H0z" stroke="#707070" fill="#FFFFFF" />
            </ClipPath>
        </Defs>
        <G clipPath="url(#a)">
            <Path
                d="M.314 11.51l9.662 9.659a1.085 1.085 0 101.536-1.533l-8.9-8.893 8.895-8.893A1.085 1.085 0 009.975.317L.313 9.976a1.1 1.1 0 00.001 1.534z"
                transform="translate(.301 -.486)"
                fill={props.fill ? props.fill : "#FFFFFF"}
            />
        </G>
    </Svg>
);

export default Back;

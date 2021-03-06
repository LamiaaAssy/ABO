import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
import { calcWidth, calcHeight } from "../../Dimension";


const BloodUnit = props => (
    <Svg
        width={props.width ? calcWidth(props.width) : calcWidth(45.502)}
        height={props.height ? calcHeight(props.height) : calcHeight(57.5)}
        style={[{ transform: [{ rotate: (props.rotateDegree ? props.rotateDegree : 0) + 'deg' }] }, props.style]}
        viewBox="0 0 45.502 57.5"
        {...props}
    >
        <Defs></Defs>
        <Path
            fill="#fd554f"
            d="M11.632 39.4a.842.842 0 01-.842-.842V6.237a4.553 4.553 0 10-9.105 0v4.792a.843.843 0 11-1.685 0V6.237a6.237 6.237 0 1112.475 0v32.325a.842.842 0 01-.843.838z"
            transform="translate(-53.415) translate(81.944)"
        />
        <Path
            fill="#fd554f"
            d="M5.66 19.764a5.662 5.662 0 01-5.656-5.656v-.41a.843.843 0 111.685 0v.41a3.971 3.971 0 107.943 0V.842a.843.843 0 011.685 0v13.266a5.662 5.662 0 01-5.657 5.656z"
            transform="translate(-53.415) translate(67.917 37.736)"
        />
        <Path
            fill="#a7e6ef"
            d="M72.484 45.824h-7.45v4.28a1.329 1.329 0 001.329 1.329h4.797a1.329 1.329 0 001.329-1.329z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#6dd8e6"
            d="M70.054 50.104v-4.28h-5.02v4.28a1.329 1.329 0 001.329 1.329h4.797c.039 0 .078 0 .115-.005a1.33 1.33 0 01-1.221-1.324z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#f9f7f8"
            d="M30.685 8.522v23.666a10.461 10.461 0 01-9.355 10.4.407.407 0 00-.363.405v2.35a1.771 1.771 0 01-1.771 1.771h-7.711a1.771 1.771 0 01-1.771-1.771v-2.35a.407.407 0 00-.363-.405 10.461 10.461 0 01-9.355-10.4V8.522a4.177 4.177 0 014.178-4.177h.843a.648.648 0 00.635-.516l.409-1.969A2.335 2.335 0 018.351.002h13.986a2.335 2.335 0 012.287 1.861l.409 1.969a.649.649 0 00.635.516h.845a4.177 4.177 0 014.172 4.174z"
            transform="translate(-53.415) translate(53.415 .842)"
        />
        <Path
            fill="#efedef"
            d="M80.734 22.878V9.364a.809.809 0 00-.808-.808H57.592a.809.809 0 00-.808.808v13.514z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#efedef"
            d="M69.235 46.187v-2.35a.407.407 0 00-.363-.405 10.461 10.461 0 01-9.355-10.4V9.364a4.177 4.177 0 014.178-4.177h.843a.648.648 0 00.635-.516l.409-1.969A2.335 2.335 0 0167.868.844h-6.1a2.335 2.335 0 00-2.288 1.859l-.409 1.969a.648.648 0 01-.635.516h-.843a4.177 4.177 0 00-4.178 4.177V33.03a10.461 10.461 0 009.355 10.4.407.407 0 01.363.405v2.35a1.771 1.771 0 001.767 1.773H71a1.771 1.771 0 01-1.765-1.771z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#e5e1e5"
            d="M59.594 8.556h-2a.809.809 0 00-.808.808v13.514h2.732V9.364a4.2 4.2 0 01.076-.808z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#fd554f"
            d="M23.95 0v12a7.1 7.1 0 01-7.091 7.091h-2.627v7.837H9.718v-7.837H7.091A7.1 7.1 0 010 12V0h23.95z"
            transform="translate(-53.415) translate(56.784 21.031)"
        />
        <Path
            fill="#fd554f"
            d="M0 0v12a7.1 7.1 0 005.3 6.861A10.411 10.411 0 012.735 12V0z"
            transform="translate(-53.415) translate(56.784 21.031)"
        />
        <Path
            fill="#fd6773"
            d="M12.45 25.157v-2.35a.407.407 0 00-.363-.405 10.4 10.4 0 01-2.369-.533v5.06h4.5a1.771 1.771 0 01-1.768-1.772z"
            transform="translate(-53.415) translate(56.784 21.031)"
        />
        <Path
            fill="#a7e6ef"
            d="M11.811 1.685H.842A.843.843 0 01.842 0H11.81a.843.843 0 110 1.685z"
            transform="translate(-53.415) translate(62.433 3.253)"
        />
        <Path
            fill="#6dd8e6"
            d="M63.275 3.253a.843.843 0 000 1.685h1.772a.644.644 0 00.126-.266l.295-1.419z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#fd554f"
            d="M10.681 8.61A5.34 5.34 0 110 8.61C0 6.374 3.072 2.243 4.556.379a1 1 0 011.568 0c1.485 1.868 4.557 5.995 4.557 8.231z"
            transform="translate(-53.415) translate(88.236 35.866)"
        />
        <Path
            fill="#fd6773"
            d="M90.507 44.476c0-2.072 2.637-5.769 4.2-7.785-.124-.16-.242-.31-.352-.447a1 1 0 00-1.568 0c-1.485 1.864-4.556 6-4.556 8.231a5.345 5.345 0 006.476 5.219 5.343 5.343 0 01-4.2-5.218z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#f9f7f8"
            d="M95.336 42.962h-.917v-.917a.843.843 0 10-1.685 0v.917h-.917a.843.843 0 100 1.685h.917v.917a.843.843 0 101.685 0v-.917h.917a.843.843 0 000-1.685zM60.826 31.013h15.868a.763.763 0 00.672-.83V16.51a.763.763 0 00-.672-.83H60.826a.763.763 0 00-.672.83v13.673a.763.763 0 00.672.83z"
            transform="translate(-53.415)"
        />
        <Path
            fill="#e5e1e5"
            d="M11.293 1.685H.842A.843.843 0 11.842 0h10.451a.843.843 0 010 1.685z"
            transform="translate(-53.415) translate(62.725 18.93)"
        />
        <Path
            fill="#e5e1e5"
            d="M11.293 1.685H.842A.843.843 0 11.842 0h10.451a.843.843 0 010 1.685z"
            transform="translate(-53.415) translate(62.725 22.383)"
        />
        <G>
            <Path
                fill="#e5e1e5"
                d="M11.293 1.685H.842A.843.843 0 11.842 0h10.451a.843.843 0 010 1.685z"
                transform="translate(-53.415) translate(62.725 25.836)"
            />
        </G>
    </Svg>
);

export default BloodUnit;

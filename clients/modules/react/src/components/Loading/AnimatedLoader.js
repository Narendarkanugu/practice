import React from "react";
import PropTypes from "prop-types";

const AnimatedLoader = props => (
    <svg
        width={props.width}
        height={props.height}
        viewBox="0 0 135 140"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect y="10" fill="#FFD23B" width="30" height="120">
            <animate
                attributeName="height"
                begin="0.5s"
                dur="1.5s"
                values="120;60;120"
                calcMode="linear"
                repeatCount="indefinite"
            />
            <animate
                attributeName="y"
                begin="0.5s"
                dur="1.5s"
                values="10;40;10"
                calcMode="linear"
                repeatCount="indefinite"
            />
        </rect>
        <rect x="30" fill="#F9A73B" y="10" width="30" height="120">
            <animate
                attributeName="height"
                begin="0.25s"
                dur="1.5s"
                values="120;60;120"
                calcMode="linear"
                repeatCount="indefinite"
            />
            <animate
                attributeName="y"
                begin="0.25s"
                dur="1.5s"
                values="10;40;10"
                calcMode="linear"
                repeatCount="indefinite"
            />
        </rect>
        <rect x="60" fill="#EF4045" width="30" height="140">
            <animate
                attributeName="height"
                begin="0s"
                dur="1.5s"
                values="120;60;120"
                calcMode="linear"
                repeatCount="indefinite"
            />
            <animate
                attributeName="y"
                begin="0s"
                dur="1.5s"
                values="10;40;10"
                calcMode="linear"
                repeatCount="indefinite"
            />
        </rect>
    </svg >
);

AnimatedLoader.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
};

AnimatedLoader.defaultProps = {
    height: 40,
    width: 60,
};
export default AnimatedLoader;
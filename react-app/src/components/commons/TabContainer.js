import React from "react";

export default function TabContainer(props) {
    return (
            <div style={{ backgroundColor: "#F9F9F9", display: "flex" }}>
                {props.children}
            </div>
        );
};

import React from "react";
export default function ConditionalWrapper({ condition, children, wrap }) {
	return condition ? React.cloneElement(wrap(children)) : children;
}

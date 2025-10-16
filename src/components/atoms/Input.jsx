import React from "react";

function Input({className = "", type = "text", ...props}) {
    const componentProps = {
        className,...(type === "textarea" ? { as: "textarea" } : { type }),...props,
    };
    
    return <Form.Control {...componentProps} />;
}

export { Input };
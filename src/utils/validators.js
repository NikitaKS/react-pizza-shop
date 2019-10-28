export const requiredField = value => {
    if (value) return undefined;

    return "Field is required!"
};

export const maxLength = (maxlength) => (value) => {
    if (value.length > maxlength) return `Max length ${maxlength} symbols`;

    return undefined;
};
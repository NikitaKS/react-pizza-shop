import React from 'react';
import style from './FormControl.module.css'
import {Field} from "redux-form";

export const FormControl = ({input, meta: {touched, error}, children,}) => {
    const hasError = touched && error;
    return (
        <div>
            <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            {children}
            </div>
            {hasError &&<span className={style.errorMessage}>{error}</span>}
        </div>
    )
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input}{...restProps}/></FormControl>
};
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
};
export const createField = (placeholder, name, validate, component, props={}, text='') => (
    <div>
    <Field
        placeholder={placeholder}
        validate={validate}
        name={name}
        component={component}
        {...props}
    /> {text}
    </div>);
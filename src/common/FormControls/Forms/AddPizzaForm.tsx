import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {maxLength15, number, required} from "../../../utils/validators";

import 'react-widgets/dist/css/react-widgets.css';
import style from '../FormControl.module.css';
import { renderField } from '../FormsControls';


export const UploadFile = (props:any) => {

    return (
        <div className={style.item}>
            Settings
            <div>
                <input onChange={props.mainPhotoSelected} type={"file"}/>
            </div>
        </div>
    );
};

const AddPizzaReduxForm = (props: any) => {
    const {handleSubmit, pristine, reset, submitting, setImage} = props;
    const filters = [{name: "Big"},{name: "All"}];

    const mainPhotoSelected = (image:any) => {
        setImage(image);
    };
    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            {/*<Field name="filter"*/}
            {/*       type="select"*/}
            {/*       component={DropDownSelect}*/}
            {/*       label="filters"*/}
            {/*       filters={filters}*/}
            {/*       validate={[number]}*/}
            {/*       warn={required}*/}
            {/*/>*/}
            <Field name="name"
                   type="text"
                   component={renderField}
                   label="name *"
                   validate={[required, maxLength15]}
            />
            <Field
                name="photo"
                type="file"
                mainPhotoSelected={mainPhotoSelected}
                component={UploadFile}
                label="photo"
            />
            <Field name="price"
                   type="number"
                   component={renderField}
                   label="price"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="size"
                   type="number"
                   component={renderField}
                   label="size"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="text_long"
                   type="text"
                   component={renderField}
                   label="text_long"
                   validate={[required]}
                   warn={required}
            />
            <Field name="text_short"
                   type="text"
                   component={renderField}
                   label="text_short"
                   validate={[required]}
                   warn={required}
            />

            <div>
                <button type="submit" disabled={submitting}>addPizza</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'addPizza'})(AddPizzaReduxForm)

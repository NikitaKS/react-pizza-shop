import React, {useRef, useState} from "react";
import style from "../Admin.module.css";

interface IEditFormProps {
    title: string
    commonValue: string | number
    type: "input" | "number"
    applyChange: (changedValue: string | number) => void
}

const EditForm = ({commonValue, type, applyChange, title}: IEditFormProps) => {
    let [editable, setEtitable] = useState(false);
    let [changedValue, changeValue] = useState(commonValue);
    let change = (e: any) => {
        changeValue(e.target.value)
    };
    let submit = () => {
        if (!changedValue || changedValue === '') {
            console.log("error")
        } else {
            applyChange(changedValue)
        }
    };

    const changeMode = () => { setEtitable(true)};

    if (editable)
        return (
            <div>
                <input type={type} value={changedValue} autoFocus={true} onChange={change} onBlur={submit}/>
            </div>
        );
    else return (
        <div className={style.col}>
            <title>{title}</title>
            <span onDoubleClick={changeMode}>{commonValue}</span>
        </div>
    )
};

export default EditForm
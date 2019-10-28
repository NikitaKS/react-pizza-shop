import React from 'react';
import {reduxForm} from "redux-form";
import style from './Order.module.css'
import {createField, Input, Textarea} from "../../common/FormControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder} from "../../Redux/pizzasReducer";

const Order = ({order, submitOrder}) => {
    const onSubmit = (formData) => {
        submitOrder(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    return (
        <>
            {order ? <Redirect to={`/`}/>:
                <div className={style.item}>
                    <OrderReduxForm onSubmit={onSubmit}/>

                </div>}
        </>
    );
};

const OrderForm = ({handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField('name', "name", [requiredField], Input)}
            {createField('first_name',"first_name", [requiredField], Input)}
            {createField('delivery_date',"delivery_date", [requiredField], Input, {type: "date"})}
            {createField('delivery_time',"delivery_time", [requiredField], Input)}
            {createField('address',"address", [requiredField], Input)}
            {createField('comment',"comment", null, Textarea, {type: "textarea"})}
            {createField('payment',"payment", null, Input, {type: "checkbox"})}

            {error && <div>
                <span className={style.error}>{error}</span>
            </div>}
            <div>
                <button>ORDER</button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return{

    }
};

const OrderReduxForm = reduxForm({form: 'order'})(OrderForm);

export default compose(
    connect(mapStateToProps, {submitOrder})
)(Order);

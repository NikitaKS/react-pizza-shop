import React, {useState} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/productsReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";

interface IProps {

}

const About: React.FC = () => {

    let [imageLoaded, handleImageLoaded] = useState(false);

    return (
        <div className={style.aboutWrapper}>
            <div>
                {!imageLoaded && <Preloader/>}
                <img src={slide} onLoad={() => {
                    handleImageLoaded(true)
                }} alt={"Pechorin Bulki"}/>
            </div>
            <article>
                fsad;ljg sdf soiuhdf isudfh lksufh lskduf lskdf hsdhf lius\
                fsdj gsuhi shdf sdf
                sdfg nsfug sudfn
                sfgh sgijh
            </article>
        </div>
    );
};


const mapStateToProps = (state: AppStateType) => {
    return {}
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);
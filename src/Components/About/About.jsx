import React, {Component} from 'react';
import style from './About.module.css';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";

class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }
    }
    handleImageLoaded() {
        this.setState({ image: 'loaded' });
    }
    render() {


        return (
                <div className={style.headerWrapper}>


                    <div>
                        {!this.state.image &&
                        <Preloader />
                        }
                        <img src={slide} onLoad={this.handleImageLoaded.bind(this)}/>
                    </div>
                </div>
        );
    }
}

export default About;

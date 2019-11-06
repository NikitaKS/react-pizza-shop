import React, {Component} from 'react';
import style from './About.module.css';
import climbing from "../../assets/images/climbing.png";


class About extends Component {

    //
    // newOrderPost = (formData) => {
    //     axios.post('http://127.0.0.1:8000/api/order/', formData)
    //         .then(res => {
    //             this.setState({resOfOrder: res.data})
    //         })
    // };
    //

    render() {
        // let formDataExample = {
        //     name: 'asda',
        //     phone: 123,
        //     day: new Date(12 / 11 / 2011),
        //     time: 1,
        //     order: [
        //         {
        //             name: "123",
        //             id: 123,
        //             photo: "http://127.0.0.1:8000/media/images/user.jpg",
        //             price: "22.00",
        //             size: "2",
        //             text_short: "da",
        //             quantity: 2
        //         },
        //     ]
        // };
        let studentIconImg = climbing;
        return (
                <div className={style.headerWrapper}>
                    <h2>FAKE POST!!!</h2>

                    <div className={style.iconWrapper}>
                        <img style={{ backgroundColor: `red`}} src={studentIconImg}/>
                    </div>
                    {/*<button onClick={() => {*/}
                    {/*    this.newOrderPost(formDataExample)*/}
                    {/*}}>post*/}
                    {/*</button>*/}

                </div>
        );
    }
}

export default About;

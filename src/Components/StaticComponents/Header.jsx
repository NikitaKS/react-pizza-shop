import React, {Component} from 'react';
import style from './Header.module.css';

class Main extends Component {

    render() {

        return (
            <div>


                <header>
                    <div className={style.headerWrapper}>asd</div>
                    <button onClick={this.piroshokGet}>pirozhok</button>
                    <button onClick={this.filtersGet}>filters</button>
                    <button onClick={()=>{this.newOrderPost(this.props.formDataExample)}}>post</button>

                </header>

            </div>
        );
    }
}

export default Main;

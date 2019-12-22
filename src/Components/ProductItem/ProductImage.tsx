import React, {useState} from 'react';
import style from './ProductItem.module.css';

interface IProps {
    imgThumbnail?: string
    openPopup: () => void
    imgUrl: string
    altText: string
}

const ProductImage = ({imgThumbnail, altText, imgUrl, openPopup}: IProps) => {

    let [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };
    if (imgThumbnail) {
        return (
            <div className={style.mainImg} onClick={openPopup}>
                {!imageLoaded && <div>
                    <img src={imgThumbnail} alt={altText}/>
                </div>}

                <img src={imgUrl} onLoad={handleImageLoaded} alt={altText}/>
            </div>
        );
    } else return (
        <div className={style.mainImg} onClick={openPopup}>
            <img src={imgUrl} onLoad={handleImageLoaded} alt={altText}/>
        </div>
    )
};

export default ProductImage;

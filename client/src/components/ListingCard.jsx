import React, { useState } from 'react'
import {
    ArrowForwardIos,
    ArrowBackIosNew,
    Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state.js";

import "../styles/listing-card.scss"
import toast from 'react-hot-toast';

const ListingCard = ({
    listingId,
    creator,
    listingPhotoPaths,
    city,
    province,
    country,
    category,
    type,
    price ,
    startDate, 
    endDate,
    numOfNights,
    totalPrice,
    booking
}) => {
    console.log(listingId)

    const [currentIndex, setCurrentIndex] = useState(0)
    console.log(currentIndex)

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user)
    const wishlist = user?.wishList || []

    const isLiked = wishlist.find((item) => item?._id === listingId)

    const patchWishList = async() => { 
        try{
            const res = await fetch(`http://localhost:4000/users/${user?._id}/${listingId}`, {
                method: "PATCH",
                header: {
                    "Content-Type": "application/json"
                }
            }) 
            const data = await res.json()
            console.log(data)
            
            dispatch(setWishList(data.wishlist))
            toast.success(data.message)
        } catch(error){
            console.log(error) 
        }
    }

    return (
        <div className='listing-card' onClick={() => {
            navigate(`/properties/${listingId}`)
        }}>
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {listingPhotoPaths?.map((photo, index) => (
                        <div className="slide" key={index}>
                            <img src={`http://localhost:4000/${photo.replace("public", "")}`} alt={`Photo ${index + 1}`} />
                            <div className="prev-button" onClick={(e) => {
                                e.stopPropagation()
                                goToPrevSlide(e)
                            }}>
                                <ArrowBackIosNew sx={{ fontSize: '16px' }} />
                            </div>
                            <div className="next-button" onClick={(e) => {
                                e.stopPropagation()
                                goToNextSlide(e)
                            }}>
                                <ArrowForwardIos sx={{ fontSize: '16px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h3>{city}, {country}</h3>
            <p>{category}</p>

            {!booking ? (
                <>
                <p>{type}</p>
                <p><span>${price}</span> per night</p>
                </>
            ) : (
                <>
                <p>{startDate} - {endDate}</p>
                <p>Total Price: <span>${totalPrice}</span> ({numOfNights} nights)</p>
                </>
            )}  

            <button className="favorite" onClick={(e) => {
                e.stopPropagation()
                patchWishList()
            }} disabled={!user}>
                {isLiked ? (
                    <Favorite sx={{ color: "red" }} />
                ) : (
                    <Favorite sx={{ color: "white" }} />
                )}
            </button>
        </div>
    )
}

export default ListingCard
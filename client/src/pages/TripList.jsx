import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { setTripList } from '../redux/state.js'
import ListingCard from '../components/ListingCard'

import "../styles/trip-list.scss";

const TripList = () => {
    const [loading, setLoading] = useState(true)
    const userId = useSelector((state) => state.user._id)
    const tripList = useSelector((state) => state.user.tripList) 

    const dispatch = useDispatch()

    const getTripList = async() => {
        try{
            const res = await fetch(`http://localhost:4000/users/${userId}/trips`, {
                method: "GET"
            })
            const data = await res.json()
            dispatch(setTripList(data))
            setLoading(false)
        } catch(error){
            console.log("Failed to fetch trip list", error.message)
        }
    }

    useEffect(() => {
        getTripList()
    }, [])

    return (
        loading ? (
            <Loader />
        ) : (
            <>
            <h1 className="title-list">Your Trip List</h1>
            <div className="list">
                {tripList?.map(({ hostId, startDate, endDate, listingId, numOfNights, totalPrice, booking = true }, index) => (
                    <ListingCard 
                        key={index}
                        listingId={listingId._id}
                        creator={hostId._id}
                        listingPhotoPaths={listingId.listingPhotoPaths}
                        city={listingId.city}
                        province={listingId.province}
                        country={listingId.country}
                        category={listingId.category}
                        startDate={startDate}
                        endDate={endDate}
                        numOfNights={numOfNights}
                        totalPrice={totalPrice}
                        booking={booking}
                    />
                ))}
            </div>
            </>
        )
    )
}

export default TripList
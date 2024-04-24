import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range'
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { facilities } from '../data.js'

import "../styles/listing-details.scss"

const ListingDetails = () => {
    const [loading, setLoading] = useState(true)

    const { listingId } = useParams()
    const [listing, setListing] = useState(null)

    const getListingDetails = async() => {
        try{
            const res = await fetch(`http://localhost:4000/properties/${listingId}`, {
                method: "GET"
            })
            const data = await res.json()
            setListing(data)
            setLoading(false);
        } catch(error){
            console.log("Failed to fetch listing details", error.message)
        }
    }

    useEffect(() => {
        getListingDetails()
    }, [listingId]);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    const handleSelect = (ranges) => {
        // Update the selected date range when user makes a selection
        setDateRange([ranges.selection]);
    }
    console.log(dateRange[0].startDate)
    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

    const customerId = useSelector((state) => state?.user?._id)

    const navigate = useNavigate()

    const handleSubmit = async() => {
        try{
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: format(dateRange[0].startDate, "dd/MM/yyyy"),
                endDate: format(dateRange[0].endDate, "dd/MM/yyyy"),
                numOfNights: dayCount,
                totalPrice: listing.price * dayCount,
            }

            const response = await fetch("http://localhost:4000/bookings/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingForm)
            })
            if(response.ok){
                navigate(`/${customerId}/trips`)
                toast.success("Booking success")
            }
        } catch(error){
            console.log("Failed to book.", error.message)
            toast.error("Failed to book")
        }
    }

    return loading ? (
        <Loader />
    ) : (
        <div className="listing-details">
            <div className="title">
                <h1>{listing.title}</h1>
            </div>

            <div className="photos">
                {listing.listingPhotoPaths?.map((item, index) => (
                    <img key={index} src={`http://localhost:4000/${item.replace("public", "")}`} alt="" />
                ))}
            </div>

            <h2>
                {listing.type} in {listing.city}, {listing.province},{" "}
                {listing.country}
            </h2>

            <p>
                {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
                {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p> 
            <hr />

            <div className="profile">
                <img src={`http://localhost:4000/${listing.creator.profileImagePath.replace("public", "")}`} alt="" />
                <h3>
                    Hosted by {listing.creator.lastName} {listing.creator.firstName}
                </h3>
            </div> 
            <hr />

            <h3 className='title'>Description</h3>
            <p>{listing.description}</p>
            <hr />

            <h3 className='title'>Highlights: {listing.highlight}</h3>
            <p>{listing.highlightDesc}</p>
            <hr />

            <div className="booking">
                <div>
                    <h2>What this place offers?</h2>
                    <div className="amenities">
                        {listing.amenities[0].split(",").map((item, index) => (
                            <div className="facility" key={index}>
                                <div className="facility_icon">
                                    {facilities.find((facility) => facility.name === item)?.icon}
                                </div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2>How long do you want to stay?</h2>
                    <div className="date-range-calendar">
                        <DateRange ranges={dateRange} onChange={handleSelect} />
                        
                        <div className="booking-details">
                            <div className="price">
                                {dayCount > 1 ? (
                                    <h2>
                                        ${listing.price} X {dayCount} nights
                                    </h2>
                                ) : (
                                    <h2>
                                        ${listing.price} X {dayCount} night
                                    </h2>
                                )}
                                <h2>Total Price: ${listing.price * dayCount}</h2>
                            </div>

                            <div className="date">
                                <p>Start Date: {format(dateRange[0].startDate, "dd/MM/yyyy")}</p>
                                <p>End Date: {format(dateRange[0].endDate, "dd/MM/yyyy")}</p>
                            </div>
                        </div>
                        
                        
                        <button className="button" type='submit' onClick={handleSubmit}>
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListingDetails
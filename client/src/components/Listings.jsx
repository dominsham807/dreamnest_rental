import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categories } from '../data.js'
import Loader from './Loader.jsx'
import { setListings } from '../redux/state.js'

import "../styles/listings.scss"
import ListingCard from './ListingCard.jsx'

const Listings = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState("All")

    const listings = useSelector((state) => state.listings)
    console.log(listings)
    
    const getFeedListings = async() => {
        try{
            const res = await fetch(
                selectedCategory !== "All" ? 
                `http://localhost:4000/properties?category=${selectedCategory}` 
                : "http://localhost:4000/properties",
                {
                    method: "GET"
                }
            )
            const data = await res.json()
            dispatch(setListings({ listings: data }))
            setLoading(false)
        } catch(error){
            console.log("Fetch Listings failed", error.message)
        }
    }

    useEffect(() => {
        getFeedListings()
    }, [selectedCategory])

    return ( 
        <> 
        <div className="category-list">
            {categories?.map((category, index) => (
                <div className={`category ${category.label === selectedCategory ? "selected" : ""}`} key={index} onClick={() => setSelectedCategory(category.label)}>
                    <div className="category_icon">{category.icon}</div>
                    <p>{category.label}</p>
                </div>
            ))}
        </div> 
        {loading ? (
            <Loader />
        ) : (
            <div className="listings">
                {listings.map(
                    ({
                        _id,
                        creator,
                        listingPhotoPaths,
                        city,
                        province,
                        country,
                        category,
                        type,
                        price,
                        booking = false
                    }, index) => (
                        <ListingCard 
                            key={index}
                            listingId={_id}
                            creator={creator}
                            listingPhotoPaths={listingPhotoPaths}
                            city={city}
                            province={province}
                            country={country}
                            category={category}
                            type={type}
                            price={price}
                            booking={booking}
                        />
                    )
                )}
            </div>
        )} 
        </>
    )
}

export default Listings
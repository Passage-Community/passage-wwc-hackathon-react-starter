import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from "../components/LogoutButton";

export default function Listing() {
    // initialize state
    const [listings, setListings] = React.useState([])

    // fetch listings from db
    React.useEffect(() => {
        fetch('http://localhost:3000/listing')
            .then((res) => res.json())
            .then(data => {
                setListings(data)
            })
    }, [])

    const listingElements = listings.map(listing => (
        // assign key with item id so react doesn't get mad
        <div key={listing._id}>
            <img src={listing.imageUrl} />
            <div>
                <h3>{listing.title}</h3>
                <p>${listing.price}/${listing.unit}</p>
                <p>{listing.text}</p>
            </div>
        </div>
    ))


    return (
        <>
            <h1>Browse Listings</h1>
            {listingElements}
            <LogoutButton />
        </>
    )
}


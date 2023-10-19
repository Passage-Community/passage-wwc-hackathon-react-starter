import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function ListingDetail() {
    const { id } = useParams()
    // initialize state
    const [listing, setListing] = React.useState(null)

    // fetch one listing by id
    React.useEffect(() => {
        const getOne = async () => {
            const listing = await axios.get(`http://localhost:8000/listing/${id}`)
            setListing(listing.data)
        }
        getOne()
    }, [id])

    return (
        <div>
            {listing ? (
                <div>
                    <img src={listing.image} />
                    <p>{listing.category}</p>
                    <h2>{listing.title}</h2>
                    <p>posted on {listing.createdAt}</p>
                    <p><span>${listing.price}</span>/{listing.unit}</p>
                    <p>{listing.text}</p>
                    <button>Message</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}
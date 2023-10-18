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
            const listing = await axios.get(`http://localhost:3000/listing/${id}`)
            console.log(listing.data)
            setListing(listing.data)
        }
        getOne()
    }, [])

    return (
        <div>
            {listing ? (
                <div>
                    <img src={listing.imageUrl} />
                    <h2>{listing.title}</h2>
                    <p><span>${listing.price}</span>/{listing.unit}</p>
                    <p>{listing.desc}</p>
                    <button>Message</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}
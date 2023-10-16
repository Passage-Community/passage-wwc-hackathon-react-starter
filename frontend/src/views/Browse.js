import {
    PassageAuth,
    PassageUnAuthGuard,
  } from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Browse() {
    return (
        <>
        <h1>Browse Listings</h1>
        <LogoutButton />
        </>
    )
}

export default Browse;
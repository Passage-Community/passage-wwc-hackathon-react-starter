import React from "react";
import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Chat from "./views/Chat";
import Listings from "./views/Listings";
import ListingDetail from "./views/ListingDetail";
import CreateListing from "./views/CreateListing";
import MyListings from "./views/MyListings";
import Inbox from "./views/Inbox";
import Favorites from "./views/Favorites";
import Learn from "./views/Learn";
import styles from "./styles/App.module.css";
import Layout from "./components/Layout";

function App() {
  return (
    <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
      <div>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/listings/create-listing" element={<CreateListing />} />
            <Route path="/:userID/listings" element={<MyListings />} />
            <Route path="/:userID/inbox" element={<Inbox />} />
            <Route path="/:userID/favorites" element={<Favorites />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* auth profile */}
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/chat" element={<Chat />} />
            <Route path="/learn" element={<Learn />} />
          </Route>
        </Routes>
      </div>
    </PassageProvider>
  );
}

export default App;

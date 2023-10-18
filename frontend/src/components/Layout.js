import React from "react"
import { Outlet } from "react-router-dom"
import styles from '../styles/App.module.css'
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div>
            <Header />
                <main className={styles.mainContainer}>
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}
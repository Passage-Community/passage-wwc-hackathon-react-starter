import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function CreateListing() {
    const [userId, setUserId] = React.useState('')
    const [userZip, setUserZip] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [firstName, setfirstName] = React.useState('')


    return (
        <div>
          <form action="" id="login" method="post">
            <h1>Login</h1>
            <p className="item">
              <label for="email"> Email </label>
              <input type="email" name="email" id="email" />
            </p>
            <p className="item">
              <label for="password"> Password </label>
              <input type="password" name="password" id="password" />
            </p>
            <p className="item">
              <input type="submit" value="Login" />
            </p>
          </form>
        </div>
      )


}
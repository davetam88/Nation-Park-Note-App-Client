import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'

export default function AboutContent(props) {

  return (
    <>
      <main>
        <div class="about-content-container">
          <h1>
            National Park Note APP
        </h1>

          <p>
            All the information you need to know about your favorite National Parks in the United States in one easy to use APP. You can narrow down your <b>search by State and Activities</b>. Once your park(s) are located, you can see <b>more pictures</b> and/or <b>YouTube videos</b> for a particular park.
            <br />
            <br />
          </p>

          <p>This APP also allows the user to <b>create his/her own account</b>; Once logged in, beside the feature mentioned above, the user will be able to save a park's information to his/her account, rate it with a <b>rating number</b> and add <b>custom notes</b>. All the information will be stored in the APP and can be viewed later. The user can also sort the stored parks by using the following criteria: <b>Park Number, Park Name, Rating, State Name, and  Activity.</b>
            <br />
            <br />
          </p>

          <p>
            To watch a <b>user demo account</b> in action,
            enter <b>Demo</b> as the user and <b>dd</b> as the password in the
          <span> </span>
            <Link to='/login' >
              <b>LOGIN</b>
            </Link >
            <span> </span>
          page.
            <br />
            <br />
          </p>
          <h1>
            The APP's Inspiration
          </h1>

          <p>
            The APP's inspiration came from my love of nature and the outdoors, and the unspoiled state of National Parks
            in
            the
            United States.
          </p>

        </div>
      </main>
    </>
  )
}

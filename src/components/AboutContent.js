import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'

export default function AboutContent(props) {

  return (
    <>
      <main>
        <div className="about-content-container">
          <h1>
            National Park Note APP
        </h1>

          <p>
            All the information you need to know about your favorite National Parks in the United States in one easy to use APP. You can narrow down your <b>search by State and Activities</b>. Once your park(s) are located, you can see <b>more pictures</b> and/or <b>YouTube videos</b> for a particular park.
            <br />
            <br />
          </p>

          <p>This APP also allows the user to <b>create his/her own account</b>; Once logged in, beside the feature mentioned above, the user will be able to <b>save a park's information</b> to his/her account, rate it with a <b>rating number</b> and add <b>custom notes</b>. All the information will be stored in the APP and can be viewed later. The user can also sort the stored parks by using the following criteria: <b>Park Number, Park Name, Rating, State Name, and  Activity.</b>
            <br />
            <br />
          </p>

          <p>
            To login to your <b>account</b> click on 
          <span> </span>
            <Link to='/login' >
              <b>LOGIN</b>
            </Link >
            <br />
            <br />
          </p>


          <p>
            To create your own <b>user account</b> click on 
          <span> </span>
            <Link to='/registration' >
              <b>REGISTRATION</b>
            </Link >
            <span> </span>
            <br />
            <br />
          </p>

          <p>
              To watch a <b>demo account</b> with data already setup in it, 
            enter <b>Demo</b> as user and <b>demo:</b> as password in the
          <span> </span>
            <Link to='/login' >
              <b>LOGIN</b>
            </Link >
            <span> </span>
          page.
            <br />
            <br />
          </p>

          <p>
              You can also add your favorite park(s) along with a note by using the public <b>Myfavpark</b> account with password <b>myfavpark</b> at the 
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

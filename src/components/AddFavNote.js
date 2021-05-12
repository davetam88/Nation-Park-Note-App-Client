import React, { useContext, useState } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import './FavForm.css'
import { findUserRecByUsername } from './Helpers';


export default function AddFavNote({ history, favParks }) {

  const favContext = useContext(MainContext)
  const [parkCode] = useState(favContext.parkCode)
  const [rating, setRating] = useState("")
  const [note, setNote] = useState("")

  let favParksNew = {
    parkCode: favContext.parkCode,
    stateCode: favContext.stateCode,
    parkName: favContext.parkName,
    rating: 1,
    note: "",
    stateName: "",
    activity: favContext.activity,
    parkNumber: 0,
  }

  let userRecNew = {};

  let handleCancel = () => {
    history.push('/')
  };

  let handleSubmit = (e) => {
    const { stateCode, stateOptions, users, username } = favContext;


    const user = findUserRecByUsername(users, username);

    e.preventDefault();


    // add to the end for now. stop number = park nubmer for now 
    favParksNew.favParkId = favContext.favParks.length + 1;
    favParksNew.parkCode = parkCode;
    favParksNew.stateCode = stateCode;
    favParksNew.rating = rating;
    favParksNew.note = note;
    favParksNew.stateName = findStateNameByCode(stateCode, stateOptions)
    favParksNew.userid = user.userid;
    // activity
    favParksNew.parkNumber = user.favParkIds.length + 1;
    user.favParkIds.push(favParksNew.favParkId);

    userRecNew = user;

    favContext.AddFavNoteSubmitCB(favParksNew, userRecNew)
    history.push('/fav-park')
  }

  return (
    <>
      <main>
        <div className="FavPark-form-container">
          <form className="FavPark-form"
            onSubmit={handleSubmit}
          >
            <h2>

              Add Note For Park<br />
              <div style={{ paddingTop: "4px", color: "limegreen" }}>
                {localStorage.getItem("park")}
              </div>

            </h2>
            <hr />

            <label htmlFor="content">Rating</label>

            <div style={{
              textAlign: "center"
            }}>

              <select required="" id="FavForm-Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                name="FavForm-Rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>


              <hr />
              <label htmlFor="content">Note</label>
              <textarea id="content" name="content" rows="4" cols="50"
                onChange={(e) => setNote(e.target.value)}
                spellCheck="false"></textarea>


              <div className="FavPark-form-buttons-wrapper">
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
                <button type='button' onClick={handleCancel}>
                  Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

function findStateNameByCode(stateCode, stateOptions) {
  for (let idx = 0; idx < stateOptions.length; idx++)
  {
    if (stateOptions[idx].value === stateCode)
    {
      return stateOptions[idx].label;
    }
  }
}

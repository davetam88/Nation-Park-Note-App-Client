import React, { useContext, useState } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import './FavForm.css'


export default function AddFavNote({ history, favParks }) {

  const favContext = useContext(MainContext)
  const [parkcode] = useState(favContext.parkcode)
  const [rating, setRating] = useState(1)
  const [note, setNote] = useState("")


  let handleCancel = () => {
    history.push('/')
  };



  let handleSubmit = (e) => {
    const { parkname, favParks, statecode, activity, stateOptions, userRec, parkdata } = favContext;

    e.preventDefault();
    const favParksNew = {};
    // add to the end for now. stop number = park nubmer for now 
    favParksNew.activity = activity;
    favParksNew.note = note;
    favParksNew.parkcode = parkcode;
    favParksNew.parknum = favParks.length + 1;
    favParksNew.rating = Number(rating);
    favParksNew.statecode = statecode;
    favParksNew.statename = findStatenameByCode(statecode, stateOptions)
    favParksNew.userid = userRec.id;
    favParksNew.parkname = parkname;
    favParksNew.parkdata = parkdata;

    favContext.AddFavNoteSubmitCB(favParksNew)

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

function findStatenameByCode(statecode, stateOptions) {
  for (let idx = 0; idx < stateOptions.length; idx++)
  {
    if (stateOptions[idx].value === statecode)
    {
      return stateOptions[idx].label;
    }
  }
}



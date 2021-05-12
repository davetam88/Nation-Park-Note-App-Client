import React, {
  useState,
  useContext,
  useEffect
} from "react";
import MainControl from './MainControl';
import NavBar from './NavBar';
import '../App.css'
import './FavForm.css'
import MainContext from '../MainContext';
import VideoList from './VideoList';
import VIDEO_DATA from "../VIDEO_DATA";

export default function VideoPage(props) {
  const { parkName } = props;

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const favContext = useContext(MainContext)

  useEffect(() => {

    let parkNameTemp = parkName;
    if (!parkName)
    {
      parkNameTemp = localStorage.getItem("park");
    }
    const api_key = 'AIzaSyBGEUctjgxxWPlw7PsY4TaLe01zwsGg3p0'; // 2 
    const searchURL = `https://www.googleapis.com/youtube/v3/search`;
    const searchString = parkNameTemp.replace(/ /g, "+");
    let maxResults = 4; // don't get too many

    const params = {
      key: api_key,
      q: searchString,
      part: "snippet",
      maxResults: maxResults
    };
    const queryString = formatParkInfoQueryParams(params)
    let videoURL = searchURL + '?' + queryString;

    let useLocalData = 0;
    if (useLocalData)
    {
      let localData = VIDEO_DATA.localData[0];
      setData(localData);
    } else
    {
      fetch(videoURL)
        .then(response => {
          if (response.ok)
            return response.json();
          let errorMsg = `${response.status} : ${response.statusText}`;
          throw new Error(errorMsg);
        })
        .then(setData)
        .catch(err => {
          let errorMsg = `Something went wrong, ErrorMsg/ErrorCode : ${err.message}`;
          setError(errorMsg)
        });
    }
  }, [parkName]);

  if (data || error)
  {
    return (
      <>
        <MainControl
          history={props.history}
          logInState={favContext.logInState}
          doFavPage={false}
          username={favContext.username}
        />
        <NavBar
          username={favContext.username}
          logInState={favContext.logInState}
        />
        <main>
          <section id="js-results" className="bg-main-display cls-results">
            {error
              ?
              <p style={{
                fontSize: '1.2em', color: "red"
              }}>{error}</p>
              :
              <VideoList history={props.history} data={data}
                parkName={parkName} />
            }
          </section>
        </main>
      </>
    );
  } else
  {
    return null;
  }
}

function formatParkInfoQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])} `)
  return queryItems.join('&');
}


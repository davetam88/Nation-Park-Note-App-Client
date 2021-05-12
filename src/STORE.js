const STORE = {
  users: [
    {
      userid: 1,
      username: 'user1',
      password: '11',
      favParkIds: [1, 2]
    },
    {
      userid: 2,
      username: 'user2',
      password: '22',
      favParkIds: []
    },
    {
      userid: 3,
      username: 'Demo',
      password: 'dd',
      // password: 'pwdemo',
      favParkIds: [3, 4, 5]
    },
  ],

  favParks: [
    {
      favParkId: 1,
      userid: 1,
      parkCode: "acad",
      stateCode: "ME",
      parkName: "Acadia National Park",
      rating: 1,
      note: "note for park 1",
      stateName: "Maine",
      activity: "Arts and Culture",
      parkNumber: 1,
      parkData: {},
    },
    {
      favParkId: 2,
      userid: 1,
      parkCode: "bicr",
      stateCode: "AL",
      parkName: "Birmingham Civil Rights National Monument",
      rating: 2,
      note: "note for Birmingham Civil Rights National Monument park",
      stateName: "Alabama",
      activity: "Biking",
      parkNumber: 2,
      parkData: {},
    },
    {
      favParkId: 3,
      userid: 3,
      parkCode: "alca",
      stateCode: "CA",
      parkName: "Alcatraz Island",
      rating: 3,
      note: "Note for Alcatraz Island Park",
      stateName: "California",
      activity: "Food",
      parkNumber: 1,
      parkData: {},
    },
    {
      favParkId: 4,
      userid: 3,
      parkCode: "goga",
      stateCode: "CA",
      parkName: "Golden Gate National Recreation Area",
      rating: 4,
      note: "Note for Golden Gate National Recreation Area Park",
      stateName: "California",
      activity: "Picnicking",
      parkNumber: 2,
      parkData: {},
    },
    {
      favParkId: 5,
      userid: 3,
      parkCode: "frri",
      stateCode: "AL",
      parkName: "Freedom Riders National Monument",
      rating: 5,
      note: "Note for Freedom Riders National Monument",
      stateName: "Alabama",
      activity: "Guided Tours",
      parkNumber: 3,
      parkData: {},
    },
  ],


  stateOptions: [
    {
      label: "Alabama",
      value: "AL",
    },
    {
      label: "Alaska",
      value: "AK",
    },
    {
      label: "Arizona",
      value: "AZ",
    },
    {
      label: "Arkansas",
      value: "AR",
    },
    {
      label: "California",
      value: "CA",
    },
    {
      label: "Colorado",
      value: "CO",
    },
    {
      label: "Connecticut",
      value: "CT",
    },
    {
      label: "Delaware",
      value: "DE",
    },
    {
      label: "District Of Columbia",
      value: "DC",
    },
    {
      label: "Florida",
      value: "FL",
    },
    {
      label: "Georgia",
      value: "GA",
    },
    {
      label: "Hawaii",
      value: "HI",
    },
    {
      label: "Idaho",
      value: "ID",
    },
    {
      label: "Illinois",
      value: "IL",
    },
    {
      label: "Indiana",
      value: "IN",
    },
    {
      label: "Iowa",
      value: "IA",
    },
    {
      label: "Kansas",
      value: "KS",
    },
    {
      label: "Kentucky",
      value: "KY",
    },
    {
      label: "Louisiana",
      value: "LA",
    },
    {
      label: "Maine",
      value: "ME",
    },
    {
      label: "Maryland",
      value: "MD",
    },
    {
      label: "Massachusetts",
      value: "MA",
    },
    {
      label: "Michigan",
      value: "MI",
    },
    {
      label: "Minnesota",
      value: "MN",
    },
    {
      label: "Mississippi",
      value: "MS",
    },

    {
      label: "Missouri",
      value: "MO",
    },
    {
      label: "Montana",
      value: "MT",
    },
    {
      label: "Nebraska",
      value: "NE",
    },
    {
      label: "Nevada",
      value: "NV",
    },
    {
      label: "New Hampshire",
      value: "NH",
    },
    {
      label: "New Jersey",
      value: "NJ",
    },
    {
      label: "New Mexico",
      value: "NM",
    },
    {
      label: "New York",
      value: "NY",
    },
    {
      label: "North Carolina",
      value: "NC",
    },
    {
      label: "North Dakota",
      value: "ND",
    },
    {
      label: "Ohio",
      value: "OH",
    },
    {
      label: "Oklahoma",
      value: "OK",
    },
    {
      label: "Oregon",
      value: "OR",
    },
    {
      label: "Pennsylvania",
      value: "PA",
    },
    {
      label: "Rhode Island",
      value: "RI",
    },
    {
      label: "South Carolina",
      value: "SC",
    },
    {
      label: "South Dakota",
      value: "SD",
    },
    {
      label: "Tennessee",
      value: "TN",
    },
    {
      label: "Texas",
      value: "TX",
    },
    {
      label: "Utah",
      value: "UT",
    },
    {
      label: "Vermont",
      value: "VT",
    },
    {
      label: "Virginia",
      value: "VA",
    },
    {
      label: "Washington",
      value: "WA",
    },
    {
      label: "West Virginia",
      value: "WV",
    },
    {
      label: "Wisconsin",
      value: "WI",
    },
    {
      label: "Wyoming",
      value: "WY",
    },
  ],


  activityOptions: [
    {
      label: "-- All Activities --",
      value: "All",
    },
    {
      label: "Biking",
      value: "Biking",
    },

    {
      label: "Birdwatching",
      value: "Birdwatching",
    },
    {
      label: "Boating",
      value: "Boating",
    },
    {
      label: "Camping",
      value: "Camping",
    },
    {
      label: "Canoeing",
      value: "Canoeing",
    },
    {
      label: "Caving",
      value: "Caving",
    },
    {
      label: "Climbing",
      value: "Climbing",
    },
    {
      label: "Cross-Country Skiing",
      value: "Cross-Country Skiing",
    },
    {
      label: "Fishing",
      value: "Fishing",
    },
    {
      label: "Fly Fishing",
      value: "Fly Fishing",
    },
    {
      label: "Foraging",
      value: "Foraging",
    },
    {
      label: "Geocaching",
      value: "Geocaching",
    },
    {
      label: "Hiking",
      value: "Hiking",
    },
    {
      label: "Historical",
      value: "Historical",
    },
    {
      label: "Horseback Riding",
      value: "Horseback Riding",
    },
    {
      label: "Hunting",
      value: "Hunting",
    },
    {
      label: "Kayaking",
      value: "Kayaking",
    },
    {
      label: "Off-Roading",
      value: "Off-Roading",
    },
    {
      label: "Picnicking",
      value: "Picnicking",
    },
    {
      label: "Scenic Drive",
      value: "Scenic Drive",
    },
    {
      label: "Shopping",
      value: "Shopping",
    },
    {
      label: "Skiing",
      value: "Skiing",
    },
    {
      label: "Stargazing",
      value: "Stargazing",
    },
    {
      label: "Swimming",
      value: "Swimming",
    },
    {
      label: "Tours",
      value: "Tours",
    },
    {
      label: "Water Activities",
      value: "Water Activities",
    },
    {
      label: "Whitewater Rafting",
      value: "Whitewater Rafting",
    },
    {
      label: "Wildlife Viewing",
      value: "Wildlife Viewing",
    },
    {
      label: "Winter Sports",
      value: "Winter Sports",
    },
  ],

  favOrderByOptoins: [
    {
      label: "Park Number",
      sortName: "parkNumber",
      selected: 0,
    },
    {
      label: "Park Name",
      sortName: "parkName",
      selected: 1,
    },
    {
      label: "Rating",
      sortName: "rating",
      selected: 0,
    },
    {
      label: "State Name",
      sortName: "stateName",
      selected: 0,
    },
    {
      label: "Activity",
      sortName: "activity",
      selected: 0,
    },
  ],
}
export default STORE;
//

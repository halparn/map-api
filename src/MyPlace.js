import { Map } from "./UI/Map";
let test;

class LoadedPlace {
  constructor(coordins, address) {
    new Map(coordins);
    const headerTitle = document.querySelector("header h1");
    headerTitle.textContent = address;
  }
}

const urlData = new URL(location.href);
const queryPrms = urlData.searchParams;
const errMsg = "couldnt find any location.";
// const coords = {
//     lat: +queryPrms.get('lat'),
//     lng: +queryPrms.get('lng')
// }
// const address = queryPrms.get('address');

const locId = queryPrms.get("location");
console.log(locId);
fetch("http://localhost:3000/location", {
  method: "POST",
  body: JSON.stringify({
    id: locId,
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    if (res.status === 404) {
      throw new Error(errMsg);
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const address = data.address;
    const coords = {
      lat: +data.coords.lat,
      lng: +data.coords.lang,
    };
    new LoadedPlace(coords, address);
  });

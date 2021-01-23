const GOOGLE_API = "AIzaSyBJ_M_QAJVVgZUE7WWlB5JR9_0AaU7FKI4";
const errMsg = "Işlem başarısız tekrar deneyiniz.";

export async function getAddressCords(coords) {
  console.log(coords)
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${coords.lat},${coords.lng}&key=${GOOGLE_API}`
  );
  if(!res.ok){
    throw new Error(errMsg)
  }
  const data2 = await res.json();
  if(data2.error_message){
    throw new Error(errMsg);
  }
  const cord = new Promise((res,rej) => {
    const coordins = data2.results[0].formatted_address;
    console.log(coordins)
    res(coordins);
  })
  return cord;
}

export async function getCoordAdress(address) {
  const urlAdress = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAdress}&key=${GOOGLE_API}`
  );
  if (!response.ok) {
    throw new Error(errMsg);
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const coords = data.results[0].geometry.location;
  return coords;
}

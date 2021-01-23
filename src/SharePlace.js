import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordAdress, getAddressCords } from "./Util/Location";

const MODAL_LOCATION = "loading-modal-content";

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.querySelector("#locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    this.sharedLink = document.getElementById("share-link");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    adressForm.addEventListener("submit", this.findAddress.bind(this));
    this.shareBtn.addEventListener("click", this.shareButton.bind(this));
  }
  //for map class

  shareButton() {
    this.text = this.sharedLink.value;
    navigator.clipboard.writeText(this.text);
    this.sharedLink.select();
    alert("Copied");
  }
  selectPlace(coordnts, address) {
    if (this.map) {
      this.map.render(coordnts);
    } else {
      this.map = new Map(coordnts);
    }
    fetch("http://localhost:3000/add-location", {
      method: "POST",
      body: JSON.stringify({
        address: address,
        lat: coordnts.lat,
        lng: coordnts.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((i) => {
        console.log(i)
        const locationId = i.data;
        this.shareBtn.disabled = false;
        this.sharedLink.value = `${
          location.origin
        }/my-place?location=${locationId}`;
      });
  }

  locateUserHandler() {
    let geoUser = {};
    const modal = new Modal(MODAL_LOCATION);
    modal.show();
    this.locateUser()
      .then((data) => {
        geoUser = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        };
        setTimeout(() => {
          getAddressCords(geoUser).then((cords) => {
            const addressTitle = cords;
            console.log(geoUser);
            modal.hide();
            if (!addressTitle) {
              throw new Error("cannot reach api");
            }
            this.selectPlace(geoUser, addressTitle);
          });
        }, 2000);
      })
      .catch((err) => modal.hide());
  }
  locateUser() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  async findAddress(event) {
    event.preventDefault();
    const address = document.querySelector("#address").value;
    console.log(address);
    if (!address) {
      alert("Please anter address");
      return;
    }
    const modal2 = new Modal(MODAL_LOCATION);
    modal2.show();
    try {
      const coords = await getCoordAdress(address);
      this.selectPlace(coords, address);
    } catch {
      console.error("invalid address");
      alert("invalid adress");
    }
    modal2.hide();
  }
}

const a = new PlaceFinder();

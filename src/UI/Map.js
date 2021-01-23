import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "YOUR_API_KEY",
  version: "weekly",
});

export class Map {
  constructor(coords) {
    this.coordinates = coords;
    loader.load().then((params) => {
      this.render(coords);
    });
  }

  render(coordinates) {
    if (!google) {
      alert("Maps couldnt load maps");
      return;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}

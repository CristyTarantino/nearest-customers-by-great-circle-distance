const EARTH_RADIUS = 6371.009;
const PI_EQUIVALENT_IN_DEG = 180;

// first formula from https://en.wikipedia.org/wiki/Great-circle_distance
// degrees args
const getCentralAngle = (degLat1, degLon1, degLat2, degLon2) => {
  const lat1 = deg2rad(degLat1),
        lon1 = deg2rad(degLon1),
        lat2 = deg2rad(degLat2),
        lon2 = deg2rad(degLon2);

  return Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon1-lon2))
}

const deg2rad = (deg) => {
  return deg * (Math.PI / PI_EQUIVALENT_IN_DEG)
}

const getGreatCircleDistance = (lat1, lon1, lat2, lon2) => {
  return EARTH_RADIUS * getCentralAngle(lat1, lon1, lat2, lon2);
}

module.exports = {
  EARTH_RADIUS,
  getCentralAngle,
  deg2rad,
  getGreatCircleDistance,
}

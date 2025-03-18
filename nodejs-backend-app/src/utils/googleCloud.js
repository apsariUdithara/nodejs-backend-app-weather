const { Translate } = require('@google-cloud/translate').v2;
const { Client } = require('@googlemaps/google-maps-services-js');

const translateClient = new Translate();
const googleMapsClient = new Client({});

const getCityNameFromCoordinates = async (lat, lon) => {
  try {
    const response = await googleMapsClient.reverseGeocode({
      params: {
        latlng: `${lat},${lon}`,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    });

    if (response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;
      const city = addressComponents.find(component => component.types.includes('locality'));
      return city ? city.long_name : null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw new Error('Unable to fetch city name');
  }
};

module.exports = {
  getCityNameFromCoordinates,
};
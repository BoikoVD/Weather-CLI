import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case "01":
            return "☀️";
        case "02":
            return "🌤️";
        case "03":
            return "☁️";
        case "04":
            return "☁️";
        case "09":
            return "🌧️";
        case "10":
            return "🌦️";
        case "11":
            return "🌩️";
        case "13":
            return "❄️";
        case "50":
            return "🌫️";
    }
};

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error("No API key set");
    }

    const coord = await getCoord(city, token);
    const weatherData = await getWeatherData(coord, token);

    return weatherData;
};

const getCoord = async (city, token) => {
    const { data } = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
        params: {
            q: city,
            appid: token,
        },
    });

    return { lat: data[0]["lat"], lon: data[0]["lon"] };
};

const getWeatherData = async (coord, token) => {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            lat: coord.lat,
            lon: coord.lon,
            appid: token,
            lang: "en",
            units: "metric",
        },
    });
    return data;
};

export { getWeather, getIcon };

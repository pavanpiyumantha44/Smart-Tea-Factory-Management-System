function createWeatherService() {
  let observers = [];
  let currentWeather = null;

  const subscribe = (observerFn) => {
    observers.push(observerFn);
  };

  const notify = (weather) => {
    observers.forEach((fn) => fn(weather));
  };

  const fetchWeatherFromAPI = async () => {
    return Math.random() > 0.5 ? "SUNNY" : "RAIN";
  };

  const checkWeather = async () => {
    const newWeather = await fetchWeatherFromAPI();
    if (newWeather !== currentWeather) {
      currentWeather = newWeather;
      console.log("🌦 Weather changed:", newWeather);
      notify(newWeather);
    }
  };

  return { subscribe, checkWeather };
}

export default createWeatherService;

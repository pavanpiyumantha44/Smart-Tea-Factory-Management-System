import createWeatherService from "./weatherService.js";
import createTaskObserver from "./taskObserver.js";
import prisma from "../lib/prisma.js";

function setupObservers() {
  const weatherService = createWeatherService();
  const taskObserver = createTaskObserver(prisma);

  weatherService.subscribe(taskObserver);

  return weatherService;
}

export default setupObservers;

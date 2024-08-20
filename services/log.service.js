import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
    console.log(
        dedent`
		${chalk.bgCyan(" HELP ")}
		Without parameters  - get weather information
		-s [CITY]           - change (save) city
		-t [API_KEY]        - change (save) token
		-h                  - show help
		`
    );
};

const printWeather = (res, icon) => {
    console.log(
        dedent`
			${chalk.bgBlue(" WEATHER ")} Weather in ${res.name}

			${icon}  ${res.weather[0].description}
			
			Temperature ${res.main.temp}°С (feels like ${res.main.feels_like}°С)
			Humidity    ${res.main.humidity}%
			Wind speed  ${res.wind.speed}m/s
		`
    );
};

export { printError, printSuccess, printHelp, printWeather };

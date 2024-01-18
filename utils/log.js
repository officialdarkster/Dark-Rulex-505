const chalk = require('chalk');
module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#FF00FF").bold('[ Error ] » ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#FF00FF").bold('[ Error ] »') + data);
     break;
		default:			        
                        console.log(chalk.bold.hex("#00BFFF").bold(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#FF9000").bold('[ Dark Rulex ] » ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#FF9000").bold('[ Dark Rulex ] » ') + data);
			break;
		default:
			console.log(chalk.bold.hex("#FF9000").bold(`[ Dark Rulex ] » `) + data);
			break;
	}
}
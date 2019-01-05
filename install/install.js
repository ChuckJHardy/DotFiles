const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");

function node() {
	printStart("NVM");

	let isInstalled = shell.exec("which -s nvm").code;

	if (isInstalled === 0) {
		shell.exec("curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash");
		shell.exec("nvm install node");
	}

	printStep("Installing Extensions");
	// shell.exec("npm i -g weatherterm");

	printComplete();
}

function tmux() {
	printStart("Tmux");

	shell.cd("~/");

	// Remove Existing Files
	if (fs.existsSync(".tmux.conf")) {
		shell.rm(".tmux.conf")
	}

	// Symlink
	shell.touch(".tmux.conf");
	shell.ln("-sf", "~/dotfiles/tmux.conf", ".tmux.conf");

	printComplete();
}

function vscode() {
	printStart("VSCode");

	shell.cd("~/");

	let destinationFile = "~/Library/Application\ Support/Code/User/settings.json"

	// Remove Existing Files
	if (fs.existsSync(destinationFile)) {
		shell.rm(destinationFile)
	}

	// Current Extensions
	printStep("Listing Current Extensions");
	shell.exec("code --list-extensions | xargs -L 1 echo code --install-extension");

	// Symlink
	shell.touch(destinationFile);
	shell.ln("-sf", "~/dotfiles/vscode/settings.json", destinationFile);

	// Extentions
	printStep("Installing Extensions");
	shell.exec("code --install-extension PeterJausovec.vscode-docker");
	shell.exec("code --install-extension vscodevim.vim");

	printComplete();
}

function printStart(stage) {
	console.log(chalk.green(`\n${stage}`));
}

function printComplete(stage) {
	console.log(chalk.white("-----------------------------------------------------"));
}

function printStep(step) {
	console.log(chalk.yellow(`-> ${step}`));
}

node();
tmux();
vscode();
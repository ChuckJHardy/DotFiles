const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");

function node() {
	let isInstalled = shell.exec("which -s nvm").code;

	if (isInstalled === 0) {
		print("NVMk");
		shell.exec("curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash");
		shell.exec("nvm install node");
	}

	// Install node packages
	// shell.exec("npm i -g weatherterm");
}

function tmux() {
	print("Tmux");

	shell.cd("~/");

	// Remove Existing Files
	if (fs.existsSync(".tmux.conf")) {
		shell.rm(".tmux.conf")
	}

	// Symlink
	shell.touch(".tmux.conf");
	shell.ln("-sf", "~/dotfiles/tmux.conf", ".tmux.conf");
}

function vscode() {
	print("VSCode");

	shell.cd("~/");

	let destinationFile = "~/Library/Application\ Support/Code/User/settings.json"

	// Remove Existing Files
	if (fs.existsSync(destinationFile)) {
		shell.rm(destinationFile)
	}

	// Symlink
	shell.touch(destinationFile);
	shell.ln("-sf", "~/dotfiles/vscode/settings.json", destinationFile);

	// Extentions
	shell.exec("code --install-extension PeterJausovec.vscode-docker");
	shell.exec("code --install-extension vscodevim.vim");
}

function print(stage) {
	console.log(chalk.blue(stage));
}

node();
tmux();
vscode();
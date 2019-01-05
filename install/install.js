const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");

// Resources
// Shell Cheatsheet - https://devhints.io/shelljs

function homebrew() {
  printStart("Homebrew");

  shell.cd("~/");

  let isInstalled = shell.exec("which -s brew").code;

  if (isInstalled === 0) {
    shell.exec('/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"')
  } else {
    shell.exec("brew update");
    shell.exec("brew upgrade");
  }

  printStep("Installing Packages");
  shell.exec("brew install git");
  shell.exec("brew install zsh");
  shell.exec("brew install tmux");
  shell.exec("brew install reattach-to-user-namespace");
  shell.exec("brew install ctags");
  shell.exec("brew install tree");
  shell.exec("brew install bat");

  printComplete();
}

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

function zsh() {
  printStart("ZSH");

  shell.cd("~/");

  // Remove Existing Files
  if (fs.existsSync(".zshrc")) {
    shell.rm(".zshrc")
  }

  if (fs.existsSync(".aliases")) {
    shell.rm(".aliases")
  }

  // Symlink
  shell.touch(".zshrc");
  shell.ln("-sf", "~/dotfiles/zshrc", ".zshrc");

  shell.touch(".aliases");
  shell.ln("-sf", "~/dotfiles/aliases", ".aliases");

  // Install .oh-my-zsh
  shell.exec('sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"');

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

function vim() {
  printStart("Vim");

  shell.cd("~/");

  // Remove Existing Files
  if (fs.existsSync(".vimrc")) {
    shell.rm(".vimrc")
  }

  if (shell.test('-d', '.vim')) {
    shell.rm('-rf', '.vim')
  }

  // Create Vim Folder
  shell.mkdir(".vim");

  // Symlink
  shell.touch(".vimrc");
  shell.ln("-sf", "~/dotfiles/vimrc", ".vimrc");

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

function changeDefaultShellToZSH() {
  printStart("Changing Shell");

  shell.cd("~/");
  shell.exec("chsh -s $(which zsh)");

  printComplete();
}

function vimPlugins() {
  printStart("Vim Plugins");

  shell.cd("~/");

  // Vundle
  shell.exec("git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim");
  shell.exec("vim +PluginInstall +qall");

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

// homebrew();
// node();
zsh();
// tmux();
// vim()
// vscode();
// changeDefaultShellToZSH();
// vimPlugins();

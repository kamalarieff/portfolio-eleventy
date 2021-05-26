---
title: How I manage dotfiles with stow and git
date: Last Modified
desc: TLDR; it is a tool to create symlinks from a directory to another directory. See the demo.
---

{% include "components/stowDemo.html" %}

# Introduction

I like to keep my development workflow equivalent in all my machines. This includes my aliases, vim config, etc. I also need to have diffing so that I can easily see the changes I've made and a history of the changes I've made in case I want to revert back. Having the dotfiles in a repo solves these two issues.

However, I still needed a way to sync the dotfiles in my local file system to the repo and vice versa. This is where `stow` comes in handy.

## How stow solved my problem?

`stow` is symlink farm manager. It manages symlinks from two different directories. When I make changes in the `dotfiles` directory, it will also reflect onto the local file system.

## How to install?

### Arch Linux

```
sudo pacman -S stow
```

### OSX

```
brew install stow
```

## Methods I've used in the past

### Copy Paste

I've used this method in the past because I wanted something quick and dirty for just *one file*. Once you start doing copy pasting more than once, it gets really troublesome to keep track of the file that is in your system with the one in your dotfiles repo.

I was using [ranger](https://github.com/ranger/ranger) to help with the copy pasting. Even then, it lacks the diffs that version control provides.

### Manually symlinking

Symlinking is the way to go. You create a symlink from the dotfile in your repo to your local file system. This way you are only managing 1 file only and it is version control tracked. However, doing this for every file is very tedious and error prone.

## Edge Cases: What happens when ...

### Creating a file in the local file system

It will automatically create a file in the source directory which is the dotfiles directory.

### Creating a file in the repo

Similar like the previous step, it will create file in the target directory which is the local file system.

# Conclusion

Having the dotfiles in a version control makes experimenting with config files easier and safer. I truly recommend `stow` to sync between the two directories. Let me know what you think or if you have any suggestions.


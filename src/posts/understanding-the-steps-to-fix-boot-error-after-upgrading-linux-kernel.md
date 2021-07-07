---
title: Understanding the steps to fix boot error after upgrading Linux kernel
date: 2021-07-03 
meta:
  desc: Unable to boot into your Linux operating system after a kernel update? This post will go through the steps and the explanation behind them.
---

# Introduction

The other day I had a little bit of panic after upgrading the kernel. I wasn't able to boot into my operating system. All I see was a black screen with this error message.

```
[    0.0000000] Initramfs unpacking failed: invalid magic at start of compressed archive
[    0.0000000] Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block
[    0.0000000] CPU: 3 PID: 1 Comm: swapper/0 Not tainted 5.4.124-1-MANJARO #1
...
...
...
[    0.0000000] --- [ end Kernel panic - not syncing: VFS: Unable to mount root fs on unknown block]
```

After looking around the forums, I found [this](https://forum.manjaro.org/t/stable-update-2021-06-14-kernels-browsers-mesa-deepin-systemd-gnome-apps-40-2-pipewire-haskell/70192/15).

Apparently, it is caused by a change in the compression algorithm so you had to uncomment the `COMPRESSION="lz4"` line in `/etc/mkinitcpio.conf`.

After replicating the steps, it is now working again.

But this post is not just on how to fix them but more to understanding why this fix works. So I will be breaking down each step.


# Steps and explanation

Here were the steps:

1.  Run live system
    
    I had to boot into Windows to create a bootable USB for this. I downloaded the ISO image from Manjaro&rsquo;s site and used [Rufus](https://rufus.ie/) to create the bootable USB.
    
    Restart your computer and choose to boot from USB. From there, you have the option to boot with Open Source drivers or proprietary drivers. I went with proprietary since I&rsquo;m using a Nvidia graphics driver. Wait for a while until you get to the next screen.
2.  Start terminal
    
    Open terminal by pressing <kbd>Ctrl+Alt+T</kbd>. Alternatively, you can open it from the start menu.
3.  Run `su` to be root
    
    This command simply switches you into to root user.
4.  Run `manjaro-chroot -a`
    
    From the [archwiki page](https://wiki.archlinux.org/title/Chroot),
    
    > An operation that changes the apparent root directory for the current running process and their children. A program that is run in such a modified environment cannot access files and commands outside that environmental directory tree
    
    You need to be in a `chroot` environment in order to mount the boot device.
    
    `manjaro-chroot` provides a helper to scan any mounted devices with the use of the `-a` flag. Otherwise, you would have to manually mount the boot device. You can read more about it [here](https://wiki.manjaro.org/index.php/GRUB/Restore_the_GRUB_Bootloader#Chroot_environment).

5.  Edit `etc/mkinitcpio.conf` as shown in the link
    ``` text/1/0
    #COMPRESSION="lz4"
    COMPRESSION="lz4"
    ```
6.  Run `mkinitcpio -P`
    `mkinitcpio` is a script to create an `initrd` (initial ramdisk) environment  also known as `initramfs`.
    `initrd` is responsible for loading the necessary files for initial startup.
    You can read more about `mkinitcpio` [here](https://wiki.archlinux.org/title/mkinitcpio).
    
    When run with the `-P` flag, it will regenerate the `initramfs` images with the changes that we made in step 5.
7.  Exit `chroot` and reboot

# Moral of the story

Remember, always keep a boot disk around just in case you come across this issue again.

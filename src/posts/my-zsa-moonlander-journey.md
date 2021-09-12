---
title: My ZSA Moonlander Journey
date: 2021-09-11 
meta:
  desc: This is my review of the ZSA Moonlander all the way from prepurchase decisions to what my plan is for the future. Read more about my experience with it.
---

# Prepurchase

These were the requirements for my next keyboard.

## Keyboard software

My previous keyboard was Ducky One 2 TKL. I knew that keyboard has built in customizability meaning I don&rsquo;t have to install a software to do all the lighting changes, macros, etc. But I feel like the customizability is lacking. After coming across [QMK](https://docs.qmk.fm) and seeing the things that you can do with it, I knew that my next keyboard has to have this. [Combos](https://docs.qmk.fm/#/feature_combo) is my favorite one.

## Ergonomics

I also wanted a more ergonomic keyboard as I want to have a long and healthy career in software development. After some digging, the answer seems to point to split keyboards.

## Orthogonal

I am also practicing stenography on my keyboard. Steno is the practice of typing in shorthand. If you have watched any lawyer TV shows, there is person who types out everything the people were saying. That person is a stenographer and practicing stenography. You can achieve this by using [Plover](https://github.com/openstenoproject/plover). So I figured that having an orthogonal keyboard would help in this area.

After doing some researching, I finally settled on the ZSA Moonlander.

![moonlander pic](/images/moonlander.jpg)

# Price

A lot of reviews mentioned the high cost of this keyboard. I also have my take on it.

For me, expensive is a relative term. I may not have a gauge on what is expensive or not since this is my first time buying a truly expensive keyboard. I think paying 300 dollars for a well built, respectable company, 2 years warrany, good customer support, friendly configurator UI is well worth the money.

I emailed them twice asking about some stuff. The replies were very quick. One of them was even from the CEO.

If I were to go the DIY route, I would have to get all the tools and parts, delivery costs, setting aside time and energy to build it, troubleshoot any issues along the way, etc. When I think along those lines, yeah 300 dollars is definitely worth it.

There are also keyboard building services but it is more expensive. For the sake of argument, let's compare one. Here is a screenshot of me choosing to build a Corne LP on [boardsource](https://boardsource.xyz) and it comes down to 265 dollars.

![screenshot of boardsource checkout](/images/boardsource.png)

Note that this does not come with key switches and keycaps. For those, I went to [splitkb](https://splitkb.com). 

![screenshot of splitkb checkout](/images/splitkb.png)

For key switches alone, the cost is 39.51 dollars (without delivery cost) totalling up to more than 300 dollars.

Perhaps my example here is a bit contrived. Maybe I could have find a cheaper service or parts. But I don't want to use my precious time for research. What I want is a keyboard without any worries.

# Experience

Initially I had some pain on the bottom of the palm of my hands. That pain went away after about two weeks. I think it was just my adjustment period.

The stagger is not enough in my opinion. I often have a hard time to reach the Q key with my pinky. Also, if you have weak pinkies, try to get switches with a smaller actuation force. I went with MX Browns, same as my previous keyboard.

Try to get the tenting legs if possible or you can 3D print one (I have no experience with this so take my advice with a grain of salt). At a certain tilt angle, the keyboard wobbles around when you hit the outer keys.

## Two times my speed plummeted

### First was the change to orthogonal

I was so used to hitting the <kbd>B</kbd>, <kbd>N</kbd>, <kbd>T</kbd> and <kbd>Y</kbd> keys with my left index finger. Having them on different splits really brought down my WPM. It took me about two weeks just to get this muscle memory going. My objective here was very simple: I had to train my fingers to fire faster than my brain.

I also wasn't sure whether to hit the <kbd>B</kbd> and <kbd>N</kbd> keys with my index finger or the thumb. I tried out with my thumb first. After some time, I switched to use my index finger. The index finger feels more natural.

### Second was the change to Miryoku layout (Home row mods)

My advice when you are starting out building layouts, don&rsquo;t try to copy your previous workflow into this new keyboard. Otherwise, you&rsquo;d end up like me, having to learn the layout twice.

The reason I say this is because I used to hit the <kbd>CTRL</kbd> key with the bottom of my left palm. So when I moved to this new keyboard, I tried to do the same by putting the <kbd>CTRL</kbd> key at the same spot. And it sucked. But I did find a solution: Miryoku layout.

The basic idea is pretty simple. Instead of doing these contortions with your fingers to press the <kbd>SHIFT</kbd> and <kbd>CTRL</kbd> keys, you move them to where your fingers are naturally resting; on the home row. You can read more about the Miryoku layout [here](https://github.com/manna-harbour/qmk_firmware/tree/miryoku/users/manna-harbour_miryoku) and [here](https://precondition.github.io/home-row-mods). With this layout, I am able to do more combinations of keypresses that is impossible to do it easily on a normal keyboard. I can do <kbd>SHIFT</kbd>+<kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>SUPER</kbd> <kbd>F9</kbd> 
very easily and I'm pretty sure this combination would not have any conflicts with any application. After changing to the Miryoku layout, I can finally utilize all of my [BSPWM](https://github.com/baskerville/bspwm) desktops because it is so much easier to reach when using the numpad layer. If I were to keep using the number row, hitting <kbd>ALT</kbd>+<kbd>9</kbd> (Switching to desktop 9) is too cumbersome.

One downside to this Miryoku layout is that it&rsquo;s harder to do one-handed operations. For example, if I want to hit <kbd>ALT</kbd>+<kbd>1</kbd>, it can easily be done on a normal keyboard. But with the Miryoku layout, I&rsquo;d have to have both hands on the keyboard. This gets exacerbated when my right hand was already on my mouse. Taking my hands off my mouse, positioning my hand on the keyboard gets kinda frustrating. I would think having a track ball on your keyboard reduces this a bit. Something like the Ploopy.

Another issue I had with home row mods is that I have to lift my fingers completely off the keys to proceed to the next taps. Otherwise, the mods will still be active. But some repetitive training fixed this real quick.

Here is my layout if you guys are interested [link](https://configure.zsa.io/moonlander/layouts/4Jo6o/latest/0). It was a fork off someone else's Miryoku layout too. Be aware, the layout in Oryx is not my final layout as I've extended it with writing some code in QMK. Continue reading to learn more about it.

## Violating the Miryoku layout

With that said, I did violate the principles a little bit. This one specifically:

> Dual-function modifiers on home row, mirrored on both hands.

I have this one layer that doesn't implement any home row mods at all. My intention with this layer is to implement all the good parts from my previous keyboard. One example is I used to have an <kbd>ALT</kbd>+<kbd>[</kbd> and <kbd>ALT</kbd>+<kbd>]</kbd> to go to previous and next desktop respectively. With the Miryoku layout, I'd have to use both hands to achieve this. Instead, I used [macros](https://docs.qmk.fm/#/feature_macros) to trigger those combinations in said layer.

I've also dedicated this layer for any keybinds that are tightly coupled to applications. For example, I have [keynav](https://github.com/jordansissel/keynav) installed. It is an application to control your mouse via keyboard. What I use it for is to move my mouse to the other monitor. I used macros here to do this as well.

## Extending Oryx with QMK

Oryx is really nice to use. But it doesn&rsquo;t support all the functionalities that QMK has to offer. The one feature that I really wanted to use was the combos feature.

I did have some trouble setting QMK up initially. I asked for some help in [reddit](https://www.reddit.com/r/ergodox/comments/pd74yp/how_do_i_compile_the_source_code_i_got_from_oryx/) and someone answered.

I use <kbd>[</kbd> and <kbd>]</kbd> a lot. Unfortunately for me, these two keys are in a separate layer when I actually wanted it to be on the base layer but I've run out of keys. That's where combos come in. I made two combos; pressing <kbd>I</kbd>+<kbd>O</kbd> and <kbd>O</kbd>+<kbd>P</kbd> gave me <kbd>[</kbd> and <kbd>]</kbd> respectively 👍.

I've barely scratched the surface with combos. You should see what [/u/seancolsen](https://www.reddit.com/user/seancolsen) did in his reddit post [My 36 key layout with only 2 layers — and lots of combos!](https://www.reddit.com/r/ErgoMechKeyboards/comments/ifrd24/my_36_key_layout_with_only_2_layers_and_lots_of/)

You can follow my guide here on how to set it up.

## Switching to normal keyboards

I find that it is not really that hard to get back to using a normal keyboard. What I did have to do however is to position my left hand so that the pinky lies on the <kbd>A</kbd> key.

The harder thing is actually switching from the home row mods to normal <kbd>SHIFT</kbd>, <kbd>CTRL</kbd> and <kbd>ALT</kbd> placements.

## White keycaps

Never again. While it does look nice, the amount of time and effort needed to maintain them just offsets it all. It takes me an hour and a half each month to clean every single key.

I have no idea why the keycaps get so dirty so quickly. I wash my hands every hour. Also, it doesn&rsquo;t help that I&rsquo;m living in a warm and humid country so my hands are just clammy all the time.

I eventually replaced the keycaps with black keycaps from my Ducky.

![moonlander black keycaps](/images/moonlander-black.jpg)

# So is this my end game?

Definitely not. If you see the picture of my keyboard, you&rsquo;ll see that I&rsquo;m only using the black keys plus 2 keys on each thumb cluster. The Moonlander layout just has too many keys that I don&rsquo;t use after I&rsquo;ve changed to the Miryoku layout.

My next keyboard will probably be a Corne LP. This time I want to build it myself and I want to take my time doing it too.

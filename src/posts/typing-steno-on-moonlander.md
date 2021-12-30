---
title: Typing steno on Moonlander
date: 2021-12-28
meta:
  desc: Check out the modifications I made to make typing steno easier with BSPWM, xdotool, sxhkd, QMK and XDA keycap profile.
desc: TLDR; it takes a while to learn steno but the experience gets better when you make some modifications.
---

<div class="flex flex-col justify-center content-center mb-8">
  <span class="m-auto">Demo video.</span>
  <video width="600" height="340" controls class="!mt-2 !mb-2">
    <source src="/images/monkeytype-demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <span class="m-auto text-xs">Shout out to my sister who helped me record this video.</span>
</div>

# Motivation

I see myself becoming a team lead one day and the vision that I have for my team is that we will be practicing [asynchronous communication](https://about.gitlab.com/company/culture/all-remote/asynchronous/). In asynchronous communication, you have to write. A lot. My logic is that in order to write more, I have to write faster.

I also have a habit of documenting my code extensively. I thought, "Wouldn't it be nice if I can write the docs faster so that I can go back to coding faster?".

I'm also an avid journaller. What I'm hoping to achieve is that I would just write any words that come into my head regardless of proper sentence structure, choice of words and grammar. I can always edit them later.

Hence, I started this journey of typing faster by learning stenography.

# What is stenography a.k.a steno?

Stenography is writing in shorthand. Instead of typing words by each letter, you press multiple keys at the same time. This is called chording.

<figure>
    <img src="/images/steno-layout.png" alt="layout of a stenography machine">
    <figcaption class="text-center">Layout of a stenography machine</figcaption>
</figure>

If you want to know how it works, check out [Art of Chording](https://www.artofchording.com/).

I used [Plover](https://www.openstenoproject.org/plover/) from the Open Steno project to enable steno typing on my keyboard.

# Journey

I started learning steno in November 2020. At the time, I was using a Ducky One 2 TKL. Normal keyboards have staggered keys so it's harder to press multiple keys because you have to angle your fingers.

<div class="flex justify-center">
    <figure>
        <img src="/images/rect1418-0-3-47.png" alt="staggered keyboard">
        <figcaption class="text-center">Pink lines on a staggered keyboard</figcaption>
    </figure>
</div>

I bought the [Moonlander](https://www.zsa.io/moonlander/) because it is a columnar keyboard. A columnar keyboard is where the keys line up in a column but the keys offset a bit on Y-axis for each column.

<div class="flex justify-center">
    <figure>
        <img src="/images/rect2231-2.png" alt="Columnar keyboard">
        <figcaption class="text-center">Blue lines on a columnar keyboard</figcaption>
    </figure>
</div>

By having a columnar keyboard, it is much easier to type those chords.

My strategy for learning steno was to get the muscle memory baked into my fingers. The goal here is to have my fingers move faster than my brain. It took me 4 months to achieve this. I would spend 20 minutes a day practicing on [Steno Jig](https://joshuagrams.github.io/steno-jig/learn-keyboard.html).

After that, it's just memorizing the chords and briefs. There's no timeline for this as this is a lifelong journey. I used [Typey Type](https://didoesdigital.com/typey-type/) to practice them .

At the time of writing, I can type at 80 wpm.

# Improvements

## QMK

The only way to get better is to do it a lot. This means that you type in steno for everything from git commits and Slack messages to documentation and thank you emails. The keyboard needs to seamlessly switch between normal mode and steno mode. There is a [stenography config](https://docs.qmk.fm/#/feature_stenography) for this in QMK but I wasn't too sure if it worked with my Moonlander due to this disclaimer:

> Note: Due to hardware limitations you may not be able to run both a virtual serial port and mouse emulation at the same time.

Since I used mouse keys, I was afraid that they would conflict with each other.

### Solution

I used a combination of Plover settings and QMK features. From my [Moonlander journey post](/posts/my-zsa-moonlander-journey/), I mentioned that I use [combos](https://docs.qmk.fm/#/feature_combo). Since steno requires you to press multiple keys at the same time, I needed to disable the combos feature. But when I exit the steno layer, the combos feature needs to be reenabled. I used a [macro](https://docs.qmk.fm/#/feature_macros) to achieve this.

I also needed a steno layer for saner key placements. There is also an additional macro I added in this layer for more efficiency but more on that later.

I also set a custom chord to toggle Plover. When I press <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd>, Plover will be toggled.

<img src="/images/plover-toggle.png" alt="Columnar keyboard" class="m-auto">

This code for the macro will do these three things:

```c
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    case PLOVER_ON:
      if (record->event.pressed) {
        // You have to do this in order to trigger Plover
        register_code(KC_Q);
        register_code(KC_W);
        register_code(KC_E);
        register_code(KC_R);
      } else {
        unregister_code(KC_Q);
        unregister_code(KC_W);
        unregister_code(KC_E);
        unregister_code(KC_R);
        combo_disable();
        layer_on(9);
      }
      return false;
    case PLOVER_OFF:
      if (record->event.pressed) {
        register_code(KC_Q);
        register_code(KC_W);
        register_code(KC_E);
        register_code(KC_R);
      } else {
        unregister_code(KC_Q);
        unregister_code(KC_W);
        unregister_code(KC_E);
        unregister_code(KC_R);
        combo_enable();
        layer_off(9);
      }
      return false;
  }
  return true;
}
```

### Suggestions

Part of becoming a better stenographer is to become more efficient with your chording. Plover has this feature called *Suggestions* where it will tell you what are the available chords for the word that was just typed.

<video width="600" height="340" controls class="m-auto">
  <source src="/images/plover-suggestions-demo.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

Since I use [BSPWM](https://github.com/baskerville/bspwm), my applications are on different desktops. This means the *Suggestions* window needs to be on the focused desktop when the Plover layer is enabled.

I used [xdotool](https://github.com/jordansissel/xdotool) and [sxhkd](https://github.com/baskerville/sxhkd) for this. I've set up a key bind in sxhkd to find a window called *Plover: Suggestions* and bring them to the focused desktop.

```
mod1 + ctrl + shift + w
    xdotool search --name "Plover: Suggestions" | xargs -I id bspc node id -d focused
```

With this key bind, I can add them to the macro code shown earlier. 

```c/4-11/
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    case PLOVER_ON:
      if (record->event.pressed) {
        register_code(KC_LCTRL);
        register_code(KC_LSHIFT);
        register_code(KC_LALT);
        register_code(KC_W);
        unregister_code(KC_W);
        unregister_code(KC_LALT);
        unregister_code(KC_LSHIFT);
        unregister_code(KC_LCTRL);
        // You have to do this in order to trigger Plover
        register_code(KC_Q);
        register_code(KC_W);
        ...
}
```

Here's a demo of it in action:

<video width="600" height="340" controls class="m-auto">
  <source src="/images/suggestions-macro.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Dictionary

When I came across a word which I don't know the chord, I had to open the dictionary to find out what they are. In order to make this a more efficient affair, I used a combination of Plover chords and QMK macro for this. 

Plover has a chord `PHRAOBG` set up to open the dictionary. But since I've rearranged the keys on the Plover layer, I need to call different keys instead.

```c/3-21/
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    ...
    case PLOVER_LOOKUP:
      if (record->event.pressed) {
        register_code(KC_E);
        register_code(KC_R);
        register_code(KC_F);
        register_code(KC_C);
        register_code(KC_V);
        register_code(KC_K);
        register_code(KC_L);
      } else {
        unregister_code(KC_E);
        unregister_code(KC_R);
        unregister_code(KC_F);
        unregister_code(KC_C);
        unregister_code(KC_V);
        unregister_code(KC_K);
        unregister_code(KC_L);
      }
      return false;
    ...
}
```

## Keycap profiles

The key caps that came with the Moonlander Glow version are from the OEM profile. It doesn't offer good steno typing experience because the keycaps are sculptured where each row of keys is differently shaped. I needed a keycap profile where the keys are uniform and the gaps between the keys are small. I decided on the XDA V2 GENTLEMAN that I got from [KPRepublic](https://kprepublic.com/).

After changing the key caps, I do feel a bit better because the edges between the key caps are much closer now so it's easier to press multiple keys. But it didn't made me faster by any mean. That comes down to practice.

In normal keyboard mode, these key caps are very comfortable. Even if you don't use steno, I recommend it. But ultimately it is a personal preference.

# Verdict

Meh. I feel like typing in steno is much more useful in a courtroom or live captioning setting where you don't have to compose sentences. In a workplace setting, I think it could work when typing meeting notes where you want to quickly jot down points. But writing documentation? Not so much.

One clear benefit is that I can type much longer in steno compared to the standard way of typing because you press less and you move your fingers less. There's less strain on my hands.

As you only type full words in steno, you get a different type of typo. Spelling gets better but sometimes you'd have wrong words entirely.

# Future

Currently, most of my typos come from missing key presses by my pinkies because they are weaker than my other fingers. I plan on trying a lighter key switch so that I can hit these keys more consistently.

# Conclusion

Learning steno is hard. It will take a long time before I can be proficient in it. With these modifications, it can make my journey easier. I will continue using it and I will get better.

Fun fact: 95% of this article is written in steno.

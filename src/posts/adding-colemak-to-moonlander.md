---
title: Making Colemak-DH and Qwerty work together on my Moonlander
date: 2022-05-24
meta:
  desc: Adding Colemak-DH on a Moonlander that already has Qwerty and Plover Steno while making it work with Vim and BSPWM using QMK's features e.g. macros, combos and layer keycodes
desc: TLDR; Using QMK's macros, combos and layer keycodes, I'm able to make Colemak-DH and Qwerty work well together
---

# Why Colemak-DH?

From my research, Qwerty is the least ergonomic layout and Colemak-DH is one of the most ergonomic layouts.

I was hesitant to add another layout into my tool belt since I'm already [writing in Steno](/posts/typing-steno-on-moonlander/) but there are still places where I couldn't apply Steno e.g. writing code. 

Desiring a more ergonomic approach when coding, I proceeded with it.

# How I learn?

I used [Colemak Club](https://gnusenpai.net/colemakclub/) to get accustomed to the layout. Once I got comfortable with a stage, I proceeded onto the next. Sometimes I would also mix in some [Keybr](https://www.keybr.com/). It took me a total of 35 hours and 30 minutes to practice and my practice sessions are quite short.

<div class="flex justify-center">
  <figure>
    <a href="/images/2022-05-23_23-48 colemak training toggl.png" target="_blank">
      <img src="/images/2022-05-23_23-48 colemak training toggl.png" alt="total training time in Colemak-DH" class="!my-0">
    </a>
    <figcaption class="text-center">Total training time</figcaption>
  </figure>
</div>

<div class="flex justify-center">
  <figure>
    <a href="/images/2022-05-23_23-50 colemak training toggl detailed.png" target="_blank">
      <img src="/images/2022-05-23_23-50 colemak training toggl detailed.png" alt="each practice session time in Colemak-DH" class="!my-0">
    </a>
    <figcaption class="text-center">Individual training time</figcaption>
  </figure>
</div>

After I've passed all stages, it's time to use it in a real world setting e.g. writing code, typing commands in terminal. 

# Challenges

One of the hardest challenges for me is how my Qwerty muscle memory keeps getting in the way of typing in Colemak-DH. I was typing in Colemak-DH and out of a sudden, my fingers were typing in Qwerty. This took me a long time to get right but after enough practice, I was able to get rid of it.

I actually stopped writing in Steno for a while just to get more practice in Colemak-DH.

# My QMK setup

Because of my reliance on [Vim](https://www.vim.org/) and [BSPWM](https://github.com/baskerville/bspwm), I had to experiment with this a lot.

## Preface

I have different RBG lighting for Qwerty and Colemak-DH layers respectively. So when I look down at my keyboard, I'll always know which layer I'm in.

<div class="flex justify-center">
  <figure>
    <a href="/images/2022-05-24_18:37 qwerty picture.jpg" target="_blank">
      <img src="/images/2022-05-24_18:37 qwerty picture.jpg" alt="picture of keyboard in Qwerty layer with backlights" class="!my-0">
    </a>
    <figcaption class="text-center">Qwerty backlights</figcaption>
  </figure>
</div>

<div class="flex justify-center">
  <figure>
    <a href="/images/2022-05-24_18-35 colemak picture.png" target="_blank">
      <img src="/images/2022-05-24_18-35 colemak picture.png" alt="picture of keyboard in Colemak-DH layer with backlights" class="!my-0">
    </a>
    <figcaption class="text-center">Colemak-DH backlights</figcaption>
  </figure>
</div>


## Toggling from Qwerty to Colemak-DH

I used a [combo](https://docs.qmk.fm/#/feature_combo) for this. I needed two keys that are very easy to trigger and that were <kbd>C</kbd><kbd>V</kbd>. Because I don't want to look at my keyboard to see if I'm in the correct layer, I've also set an identical position combo <kbd>C</kbd><kbd>D</kbd> in the Colemak-DH layer. This way I can spam these keys and know that I'll always be in the Colemak-DH layer.

<div class="flex justify-center space-x-2">
  <figure>
    <a href="/images/2022-05-24_18-54 oryx qwerty cv.png" target="_blank">
      <img src="/images/2022-05-24_18-54 oryx qwerty cv.png" alt="CV in Qwerty layer" class="!my-0">
    </a>
    <figcaption class="text-center">CV position in Qwerty</figcaption>
  </figure>
  <figure>
    <a href="/images/2022-05-24_18-54 oryx colemak cd.png" target="_blank">
      <img src="/images/2022-05-24_18-54 oryx colemak cd.png" alt="CV in Colemak-DH layer" class="!my-0">
    </a>
    <figcaption class="text-center">CD position in Colemak-DH</figcaption>
  </figure>
</div>

```c
combo_t key_combos[COMBO_COUNT] = {
  [CV_TOGGLE] = COMBO_ACTION(cv_combo),
  [CD_TOGGLE] = COMBO_ACTION(cd_combo),
};

void process_combo_event(uint16_t combo_index, bool pressed) {
  switch(combo_index) {
    case CV_TOGGLE:
    case CD_TOGGLE:
      if (pressed) {
        layer_off(_QWERTY);
        layer_on(_COLEMAKDH);
      }
      break;
  }
}
```

I've also set a longer term so that it's easier to hit these combos.

```c
uint16_t get_combo_term(uint16_t index, combo_t *combo) {
  switch (index) {
    case CV_TOGGLE:
    case CD_TOGGLE:
      return 200;
  }

  return COMBO_TERM;
}
```

The ZSA fork of QMK has not yet support for [layer independent combos](https://docs.qmk.fm/#/feature_combo?id=layer-independent-combos) so I went with this method instead.

## Toggling from Colemak-DH to Qwerty

Nothing too special here. I put a `TO(_QWERTY)` in the Colemak-DH layer to toggle off all layers except the Qwerty layer.

<div class="flex justify-center">
  <figure>
    <a href="/images/2022-05-24_18-59 oryx colemak TO.png" target="_blank">
      <img src="/images/2022-05-24_18-59 oryx colemak TO.png" alt="TO in Colemak-DH layer" class="!my-0">
    </a>
    <figcaption class="text-center">Position of TO(_QWERTY) in Colemak-DH layer</figcaption>
  </figure>
</div>

## Toggling between Qwerty and Colemak-DH

I've also added a [macro](https://docs.qmk.fm/#/feature_macros) when I don't feel like using two fingers. I put this in a place where it's easy for my pinky to hit. The downside to this is that I need to be careful or I'll have to look at the keyboard to see which layer I'm in.

<div class="flex justify-center space-x-2">
  <figure>
    <a href="/images/2022-05-24_19-06 oryx qwerty toggle_layout.png" target="_blank">
      <img src="/images/2022-05-24_19-06 oryx qwerty toggle_layout.png" alt="TOGGLE_LAYOUT in Qwerty layer" class="!my-0">
    </a>
    <figcaption class="text-center">TOGGLE_LAYOUT position in Qwerty</figcaption>
  </figure>
  <figure>
    <a href="/images/2022-05-24_19-05 oryx colemak toggle_layout.png" target="_blank">
      <img src="/images/2022-05-24_19-05 oryx colemak toggle_layout.png" alt="TOGGLE_LAYOUT in Colemak-DH layer" class="!my-0">
    </a>
    <figcaption class="text-center">TOGGLE_LAYOUT position in Colemak-DH</figcaption>
  </figure>
</div>

```c
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    case TOGGLE_LAYOUT:
      if (record->event.pressed) {
        if (layer_state_is(_QWERTY)) {
          layer_off(_QWERTY);
          layer_on(_COLEMAKDH);
        } else if (layer_state_is(_COLEMAKDH)) {
          layer_off(_COLEMAKDH);
          layer_on(_QWERTY);
        }
      }
      return false;
  }
  return true;
}
```

## Making it work with Vim

The way I've set up my keyboard is my <kbd>ESC</kbd> key is also a `Layer Tap` (`LT`) key that goes to a different layer called `_ADDITIONAL` when held.

<div class="flex justify-center items-center space-x-2">
  <figure>
    <a href="/images/2022-05-24_19-09 oryx qwerty additional layer.png" target="_blank">
      <img src="/images/2022-05-24_19-09 oryx qwerty additional layer.png" alt="ESC layer tap position in Qwerty layer" class="!my-0">
    </a>
    <figcaption class="text-center">LT(_ADDITIONAL, KC_ESCAPE) position in Qwerty</figcaption>
  </figure>
  <figure>
    <a href="/images/2022-05-24_19-08 oryx colemak additional layer.png" target="_blank">
      <img src="/images/2022-05-24_19-08 oryx colemak additional layer.png" alt="ESC layer tap position in Colemak-DH layer" class="!my-0">
    </a>
    <figcaption class="text-center">LT(_ADDITIONAL, KC_ESCAPE) position in Colemak-DH</figcaption>
  </figure>
</div>

One big annoyance is switching from Colemak-DH in Vim's insert mode to Qwerty in Vim's normal mode. My first solution was to add an intercept to the <kbd>ESC</kbd> key so that it turns off the Colemak-DH layer.

```c
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    case KC_ESCAPE:
      if (record->event.pressed) {
        layer_off(_COLEMAKDH);
        tap_code(KC_ESCAPE);
      }
      return false;
  }
  return true;
}
```

However, this means I'd have no access to the `_ADDITIONAL` layer from the Colemak-DH layer. I'd have to tap <kbd>ESC</kbd> first to get out of the Colemak-DH layer and then hold <kbd>ESC</kbd> to switch into the `_ADDITIONAL` layer.

Basically, I needed a code version of the `LT` functionality and this macro did just that (thanks to /u/riding_qwerty from this [reddit thread](https://www.reddit.com/r/olkb/comments/afm9ii/qmk_macro_in_modtap_keys/)). 

```c
uint16_t key_timer;

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  switch (keycode) {
    case LTAP_ADDITIONAL_ESCAPE:
      if (record->event.pressed) {
        key_timer = timer_read();
        layer_on(_ADDITIONAL);
      } else {
        layer_off(_ADDITIONAL);
        if (timer_elapsed(key_timer) < TAPPING_TERM) {
          layer_off(_COLEMAKDH);
          tap_code(KC_ESCAPE);
        }
      }
      return false;
  }
  return true;
}
```

This macro will keep track of the time you've held your key. If it's lower than the `TAPPING_TERM`, it will register as a tap. Otherwise, it's a hold. 

One downside is I need to be aware that I'll be in the Qwerty layer after hitting the <kbd>ESC</kbd> key in non-Vim setting e.g. <kbd>CTRL</kbd><kbd>F</kbd> in the browser.

# Colemak-DH as default layer

It's a no from me. I tried this *twice* but having to change Vim and BSPWM keybinds is just too much. There is a [vim-colemak](https://github.com/beardedfoo/vim-colemak) plugin but I haven't tried it out yet as I don't think it's worth trying. 

# What about typing in Qwerty?

I still need to remember the Qwerty keys for one letter typos (my blank key caps actually made this harder for me). It's just very cumbersome to go into Vim's replace mode, switch to Colemak-DH and make the change.

I'm also unable to type long sentences in Qwerty on this keyboard anymore. No issue for other keyboards though. My guess is that my muscle memory is keyboard-based.

# Tips on typing in Colemak-DH

Try to hover your fingers over the keyboard rather than resting your palms on the desk. For example, to type `YOU`, you'd have to use your ring finger for <kbd>Y</kbd>, pinky for <kbd>O</kbd> and ring finger for <kbd>U</kbd>. It's much easier to do this when your fingers are hovering.

# Remarks

I had 90 WPM in Qwerty and now I have 80 WPM in Colemak-DH. I don't really need a high WPM when writing long sentences as I have Steno for that.

As for writing code, jury's still out. I don't have data to say that it's actually better. All I have to go on is feeling. And I feel the same.

I made so many changes to my workflow i.e. [split and columnar keyboard](/posts/my-zsa-moonlander-journey/), Steno writing and Colemak-DH that it's hard to tell whether Colemak-DH made any difference or not.

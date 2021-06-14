---
title: Filter /r/TikTokCringe by date
date: 2021-06-15
meta:
  desc: Managing dotfiles across multiple machines can be a pain. It doesn't have to be when you use stow and git.
desc: Filter the subreddit /r/TikTokCringe posts between two dates
---

# Demo

![svelte tiktokcringe demo](/images/svelte-tiktokcringe-demo.webp)

Link: [https://compassionate-wozniak-389864.netlify.app](https://compassionate-wozniak-389864.netlify.app)

Github: [https://github.com/kamalarieff/svelte-tiktokcringe](https://github.com/kamalarieff/svelte-tiktokcringe)

# Motivation

I wanted to find a song from a post but I couldn't find it from Reddit's top posts because it was two months ago at the time of writing. You can only filter the top posts by day, week, month, year or all time. So I built this in order to filter by date range.

I also wanted to learn [Svelte](https://svelte.dev/). So I figured this would be a good chance to do so.

If you're thinking that this project is unfinished, then you might be right. I only did this project to find a song. There's still some things that can be improved like not fetching on every date change, adding a previous button, handle edge cases where there could be empty posts, etc. But as long as it does what it is intended to do, then it is considered finished by me.

# Tech stack

As mentioned earlier, I'm using Svelte for building the UI. Other than that, I'm using [tailwind](https://tailwindcss.com/) for styling, [axios](https://github.com/axios/axios) for data fetching because I don't like dealing with native fetch and [whirl](https://whirl.netlify.app/) for the loading icon.

# Caveats

Reddit's API doesn't have pagination filters so I had to be clever here. What they do have is a `after` query which corresponds to a post id.

So in order to get posts from two months ago, we need to get the posts from the year filter. Then we need to only filter posts where the created time is between the date range. Then we need to get the last post id to pass to the endpoint to mimic pagination.

 That's why you'll see the number of posts are not the same as the page before when you click next. This is because of that hack.

I've tried to use the third party API [redditsearch](https://github.com/pushshift/api) but the responses don't have the updated score.

The videos also don't have any sound. This is because Reddit splice their videos into separate video and audio files.  I haven't found a way to fix this yet.

# What I've learned

I've only scratch the surface of Svelte but here's what I've learnt so far.

Svelte is really nice to use but it's not as fully featured as React. The reactive declarations is a step up from React's `useState` and `useEffect`. It makes the code concise.

The local style tags is way better than CSS modules.

The computed JavaScript files are also smaller due to Svelte not needing a virtual dom.

# So did I find the song?

No. The song is way too buried and I've also kinda forgotten the video.

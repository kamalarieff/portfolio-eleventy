---
layout: 'layouts/profile.html'
title: Profile
meta:
  desc: Get to know more about me.
intro:
  title: About me
---

I'm a full stack developer from InstaHome mainly focusing on JavaScript language. React for frontend, Node.js for backend.

I'm usually on the computer most of the time coding and learning. When I'm not on the computer, I enjoy cycling.

I use VIM for coding and Emacs `org-mode` and `org-roam` for notetaking.

I am currently rocking a ZSA moonlander with Gateron Clear and Logitech MX Ergo for my peripherals.

---

<a class="p-4 shadow-md rounded-md bg-blue-600 !text-white !no-underline" download href="/Kamal Arieff Ahmad Faizel Resume.pdf" rel="noindex">Download My Resume</a>

## Work Experience

{% for item in resume.workExperience %}
<h3>{{ item.company }}</h3>
{% for jobExperience in item.jobExperience %}
<h4 class="flex">
{{ jobExperience.position }}
<span class="ml-auto text-gray-500">{{ jobExperience.date }}</span>
</h4>
<ul>
{% for responsibility in jobExperience.responsibilities %}
<li>{{ responsibility }}</li>
{% endfor %}
</ul>
{% endfor %}
{% endfor %}

## Education

{% for item in resume.education %}
<h3 class="flex">
{{ item.schoolName }}
<span class="ml-auto text-gray-500">{{ item.date }}</span>
</h3>
<h4>{{ item.courseName }}</h4>
<p>{{ item.description }}</p>
{% endfor %}

## Proficiencies
<ul>
{% for item in resume.technicalSkills %}
<li>{{ item }}</li>
{% endfor %}
</ul>

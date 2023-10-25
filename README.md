---
layout: default
---

# Mini-Journal Jekyll Theme

![Powered by Jekyll](https://img.shields.io/badge/powered_by-Jekyll-yellow.svg)
[![GitHub Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://silvernberry.github.io/mini-journal)

**Demo:** [Visit Mini-Journal Demo](https://silvernberry.github.io/mini-journal)

Mini-Journal is a minimalist Jekyll theme designed for hosting on GitHub Pages, particularly well-suited for long-form content creators such as researchers, journal writers, bloggers, and academicians. It is straightforward to set up and deploy, with a range of pre-built features. Licensed under the [MIT License](https://opensource.org/license/mit). Built on top of the [Jekyll Minima Theme](post-excerpts).

# Mini-Journal Features

## Markdown Features

Markdown features supported, with checked options available:

- [x] Headers
- [x] Bold, Italics, Strikethrough
- [x] Bullet Lists, Numbered Lists
- [x] [Tables](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)
- [x] Links
- [x] Checklists
- [x] [Footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)
- [x] [Sub/Super Script](https://gist.githubusercontent.com/bt5e/7507535/raw/7eaa015130b2b8b2372e41f81cc5c1c6a1407972/gistfile1.md)
- [x] [Images](#step-4--add-your-journal-posts)
- [x] [Code with Syntax Highlight](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks)
- [x] [Math (Mathjax Support)](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions)
- [x] [iFrame Embeds](https://css-tricks.com/embedded-content-in-markdown)
- [ ] Horizontal Line
- [ ] Quotes
- [ ] Alerts
- [ ] Emoji Code
- [ ] Green checkmarks 

## Additional Features

- [x] Homepage (Recent Posts)
- [x] All Posts Page
- [x] About Me Page
- [x] Dark/Light Theme
- [x] Discussion Link
- [x] YouTube Embed
- [x] Table of Contents
- [x] Social Sharing Buttons
- [x] Download as PDF
- [x] Sitemap & Robots.txt
- [x] RSS Feeder
- [x] Edit on GitHub (For GitHub Pages)
- [x] Footer Attribution under MIT License
- [ ] Modern Code Block UI
- [ ] Mermaid JS Compatibility
- [ ] PlantUML Diagram Compatibility
- [ ] System Theme as Default
- [ ] Journal Translations
- [ ] Giscus Comments

## Front Matter

Front Matter is a vital component that should be included at the beginning of every `postname.md` file located within the `_JOURNALS` folder. Here is an example of a well-structured front matter:

```yaml
---
title: Your Title Here
description: A Moderately Long Description of Your Journal
date: YYYY-MM-DD
discuss: slughere
youtube: content-id-here
toc: true
---
```

Here's how each component functions:

- **Title:** Use the `title` field to specify your post's title, which will be displayed in Header 1 format.

- **Description:** The `description` field allows you to provide a moderately long description that appears just below the title, offering context to your content.

- **Date:** Input the date in the Year-Month-Date format (e.g., YYYY-MM-DD) to display it beneath the description. This date serves for sorting posts and identifying recent entries.

- **Discuss:** Customize the `discuss` field with the desired slug to create a discussion link associated with your site's pre-defined discussion website.

- **YouTube:** In the `youtube` field, you can insert the content ID for a linked YouTube video, making it easily accessible to your readers.

- **Table of Contents:** To include a Table of Contents, set `toc` to `true`. This feature enhances the navigation and user experience within your journal entry.

# Customized Free Mini-Journal Website on GitHub Pages

**Difficulty:** ★★☆☆☆ (GitHub Beginner)

## Step 1: Fork Mini-Journal Repo

Fork the Mini-Journal Repo to your GitHub Profile

[Use this One-Tap link](https://github.com/silvernberry/mini-journal/fork)

## Step 2: Customize Your Site Appearance

### `/_config.yml`

### `/assets/css/main.css`

### `/assets/css/syntax.css`

### `/_includes/journalmd.html`

## Step 3: Remove Theme's Default Content

### `/_JOURNALS/`

### `/README.md`

## Step 4: Add Your Journal Posts

**Important Note**: Include `{{site.baseurl}}` in image URLs, e.g., `![Image Alt Text]({{site.baseurl}}/location/image.extension)`.

## Step 4: Custom Domain on GitHub Pages

# Awesome Mini-Journals

# Contact Me

For feature updates to the Mini-Journal Jekyll Theme contact me via,

- [Telegram](https://t.me/naveenjose02)
- [Email](mailto:silverberry622@gmail.com)

Also feel free to contribute to this open-source repository.

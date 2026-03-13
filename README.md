# launch-date-counter
Launch countdown landing page with glassmorphism UI, animated particles, and neon effects

# Launch Date Counter

A coming soon / launch countdown landing page built with plain HTML, CSS and JavaScript. No frameworks, no dependencies.

## What's in here

- Countdown timer that ticks down to a configurable launch date
- Glassmorphism cards with neon glow borders
- Floating particles and gradient orbs in the background
- Mouse-follow glow effect and parallax on background elements
- Email notification form (opens user's email client)
- WhatsApp channel link
- Progress bar that fills up as launch day approaches
- Fully responsive, works on mobile

## Files

- index.html - the page
- style.css - all the styling
- script.js - countdown logic, particles, animations

## How to change the launch date

Open script.js and edit the first line:

var LAUNCH_DATE = new Date('2026-03-26T18:00:00');

Format is YYYY-MM-DDTHH:MM:SS. Change it to whatever date and time you want.

## How to change the email

Same file, third line:

var NOTIFY_EMAIL = 'your email;

## How to run

Just open index.html in a browser. No build step, no install, nothing.

## License

Do whatever you want with it.

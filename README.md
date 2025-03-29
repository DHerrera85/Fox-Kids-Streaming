***Fox Kids Streaming Site***

Overview

* A retro-themed website inspired by Fox Kids Latin America from the early 2000s. It features:
* A red banner at the top with the Fox Kids logo and a slogan.
* A left sidebar with large buttons: Series, Juegos, Concursos, Videos, Programación.
* A round schedule gallery displaying 24 show icons (100×100 px), scrolling horizontally with arrows.
* An embedded YouTube video (“AHORA EN PANTALLA”).
Multiple vertical image galleries for SUPER SENTAI, INVASIÓN ANIME, LIVE ACTION, COMEDY, etc.

Each gallery limits how many items are visible at once — using one-click-at-a-time horizontal scrolling in a circular loop.

**Key Features**
1. Retro Aesthetic
   
* Bold orange/red color scheme, large chunky buttons, stylized Audiowide font reminiscent of early 2000s Fox Kids design.
  
2. Left Navigation Bar
* Big, rectangular red buttons with white text (hover effect turns them yellow).
* Main categories: Series, Juegos, Concursos, Videos, Programación.
3. Round Schedule Gallery (100×100 px)
* Shows 10 items on-screen at once, each with a time label.
* Horizontal scrolling arrows let users move left or right 1 item at a time.
* Circular: after the 24th item, it loops back to the first.
4. YouTube Embed - “Ahora en Pantalla”

* Black background with a border in Fox Kids red.
* Showcases a featured video clip (e.g., Digimon Opening Latino).
  
5. Vertical Image Galleries
* SUPER SENTAI, INVASIÓN ANIME, LIVE ACTION, COMEDY, etc.
* Each displays 5 items side-by-side in a row.
* Clicking arrows scrolls horizontally one item at a time, looping back at the end.
* Poster size shrunk (e.g., 180×270) so exactly 5 fit on a typical desktop screen.

6. Responsive Layout

* Sidebar reflows below the banner on small screens.
* Gallery items become smaller (e.g., from 180×270 to 120×180) so they remain scrollable on mobile.

**How It Works**
1. HTML Structure 
   
* Header holds the Fox Kids logo and slogan.
* Container splits into:
* Left Sidebar with ul menu buttons.
* Main Content for:
* Round Schedule Gallery

YouTube embed (“AHORA EN PANTALLA”)
Multiple galleries (SUPER SENTAI, etc.), each with id="..."

2. CSS 
* Uses flexbox to create a two-column layout (sidebar + main content).
* .round-gallery & .scroll-gallery are set to flex-wrap: nowrap; overflow: hidden; for horizontal carousels.
* Hover effects and transitions apply brightness or scale on images.
* Media queries (@media (max-width: 768px)) adjust layouts for smaller screens, shrink images further, and stack the sidebar.

3. JavaScript

* Each gallery uses a carousel logic:
* Round Gallery: 10 visible at once, circular shift on each arrow click.
* Other Galleries: 5 visible at once, also circular.
* Scrolling Implementation:
We measure each item’s width + gap.
Clicking the right arrow increments a currentIndex, and the script shifts the gallery or toggles display: none for hidden items.
Loops back to the start after the last item.

* Getting Started
1. Open index.html in your web browser to view the site.
2. Check your images: All .png and .jpg references in the img tags should match your local file paths
3. Edit styles.css for color, spacing, or font changes.
4. Edit script.js to adjust the scrolling logic or the number of visible items in each gallery.


Site: https://foxkids-tribute.netlify.app/


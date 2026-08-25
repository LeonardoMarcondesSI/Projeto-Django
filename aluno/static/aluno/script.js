
   const intro =
   document.getElementById("intro");

const guild =
   document.getElementById("guild");

const enterButton =
   document.getElementById("enterButton");

const transitionScreen =
   document.getElementById("transitionScreen");

let entered = false;


function enterGuild() {

   if (entered) {
       return;
   }

   entered = true;


   transitionScreen.classList.add(
       "active"
   );


   setTimeout(() => {

       intro.classList.add(
           "leave"
       );

   }, 450);


   setTimeout(() => {

       guild.classList.remove(
           "hidden"
       );

       guild.classList.add(
           "reveal"
       );

       document.body.classList.remove(
           "locked"
       );

   }, 850);

}


enterButton.addEventListener(
   "click",
   enterGuild
);


document.addEventListener(
   "keydown",
   enterGuild
);


/* ============================================================
  CURSOR MÁGICO
  ============================================================ */

const cursor =
   document.getElementById(
       "magicCursor"
   );

const cursorGlow =
   document.getElementById(
       "cursorGlow"
   );

const particleContainer =
   document.getElementById(
       "magicParticles"
   );


let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;

let particleCounter = 0;


document.addEventListener(
   "mousemove",
   event => {

       mouseX =
           event.clientX;

       mouseY =
           event.clientY;


       cursor.style.left =
           mouseX + "px";

       cursor.style.top =
           mouseY + "px";


       particleCounter++;


       if (
           particleCounter % 4 === 0
       ) {

           createCursorParticle(
               mouseX,
               mouseY
           );

       }

   }
);


function animateCursorGlow() {

   glowX +=
       (
           mouseX -
           glowX
       ) * 0.12;


   glowY +=
       (
           mouseY -
           glowY
       ) * 0.12;


   cursorGlow.style.left =
       glowX + "px";


   cursorGlow.style.top =
       glowY + "px";


   requestAnimationFrame(
       animateCursorGlow
   );

}


animateCursorGlow();


function createCursorParticle(
   x,
   y
) {

   const particle =
       document.createElement(
           "div"
       );


   particle.classList.add(
       "cursor-particle"
   );


   particle.style.left =
       x + "px";


   particle.style.top =
       y + "px";


   const directionX =
       (
           Math.random() -
           0.5
       ) * 35;


   const directionY =
       (
           Math.random() -
           0.5
       ) * 35;


   particle.style.setProperty(
       "--particle-x",
       directionX + "px"
   );


   particle.style.setProperty(
       "--particle-y",
       directionY + "px"
   );


   particleContainer
       .appendChild(
           particle
       );


   setTimeout(
       () => {

           particle.remove();

       },
       700
   );

}


/* ============================================================
  BACKGROUND REAGINDO AO MOUSE
  ============================================================ */

const backgroundGrid =
   document.getElementById(
       "backgroundGrid"
   );

const lightOne =
   document.getElementById(
       "lightOne"
   );

const lightTwo =
   document.getElementById(
       "lightTwo"
   );


document.addEventListener(
   "mousemove",
   event => {

       const x =
           (
               event.clientX /
               window.innerWidth
               -
               0.5
           );


       const y =
           (
               event.clientY /
               window.innerHeight
               -
               0.5
           );


       backgroundGrid.style.transform =
           `
           translate(
               ${x * -25}px,
               ${y * -25}px
           )
           `;


       lightOne.style.transform =
           `
           translate(
               ${x * 100}px,
               ${y * 100}px
           )
           `;


       lightTwo.style.transform =
           `
           translate(
               ${x * -90}px,
               ${y * -90}px
           )
           `;

   }
);


/* ============================================================
  ESTRELAS
  ============================================================ */

const stars =
   document.getElementById(
       "stars"
   );


for (
   let i = 0;
   i < 65;
   i++
) {

   const star =
       document.createElement(
           "div"
       );


   star.classList.add(
       "star"
   );


   star.style.left =
       Math.random()
       * 100
       + "%";


   star.style.animationDuration =
       (
           10 +
           Math.random()
           * 20
       )
       + "s";


   star.style.animationDelay =
       (
           Math.random()
           * -20
       )
       + "s";


   const size =
       (
           1 +
           Math.random()
           * 2
       );


   star.style.width =
       size + "px";


   star.style.height =
       size + "px";


   stars.appendChild(
       star
   );

}


/* ============================================================
  CARDS 3D
  ============================================================ */

const cards =
   document.querySelectorAll(
       ".character-card"
   );


cards.forEach(
   card => {

       const content =
           card.querySelector(
               ".card-content"
           );


       card.addEventListener(
           "mousemove",
           event => {

               const rect =
                   card.getBoundingClientRect();


               const x =
                   event.clientX
                   -
                   rect.left;


               const y =
                   event.clientY
                   -
                   rect.top;


               const centerX =
                   rect.width / 2;


               const centerY =
                   rect.height / 2;


               const rotateX =
                   (
                       y -
                       centerY
                   ) / 22;


               const rotateY =
                   (
                       centerX -
                       x
                   ) / 22;


               card.style.transform =
                   `
                   rotateX(
                       ${rotateX}deg
                   )

                   rotateY(
                       ${rotateY}deg
                   )

                   translateY(-7px)
                   `;


               content.style.setProperty(
                   "--mouse-x",
                   (
                       x /
                       rect.width
                       * 100
                   )
                   + "%"
               );


               content.style.setProperty(
                   "--mouse-y",
                   (
                       y /
                       rect.height
                       * 100
                   )
                   + "%"
               );

           }
       );


       card.addEventListener(
           "mouseleave",
           () => {

               card.style.transform =
                   `
                   rotateX(0deg)
                   rotateY(0deg)
                   translateY(0)
                   `;

           }
       );

   }
);


/* ============================================================
  FILTRO
  ============================================================ */

const searchInput =
   document.getElementById(
       "searchInput"
   );


const courseFilter =
   document.getElementById(
       "courseFilter"
   );


const visibleCount =
   document.getElementById(
       "visibleCount"
   );


const courses =
   new Set();


cards.forEach(
   card => {

       const course =
           card.dataset.course;


       if (course) {

           courses.add(
               course
           );

       }

   }
);


[
   ...courses
]
.sort()
.forEach(
   course => {

       const option =
           document.createElement(
               "option"
           );


       option.value =
           course;


       option.textContent =
           course;


       courseFilter.appendChild(
           option
       );

   }
);


function filterCards() {

   const search =
       searchInput
           .value
           .toLowerCase()
           .trim();


   const course =
       courseFilter.value;


   let visible =
       0;


   cards.forEach(
       card => {

           const name =
               card.dataset.name;


           const cardCourse =
               card.dataset.course;


           const matchesName =
               name.includes(
                   search
               );


           const matchesCourse =
               !course
               ||
               cardCourse ===
               course;


           const shouldShow =
               matchesName
               &&
               matchesCourse;


           card.style.display =
               shouldShow
               ? ""
               : "none";


           if (shouldShow) {

               visible++;

           }

       }
   );


   visibleCount.textContent =
       visible;

}


searchInput.addEventListener(
   "input",
   filterCards
);


courseFilter.addEventListener(
   "change",
   filterCards
);


/* ============================================================
  MODAL
  ============================================================ */

const modal =
   document.getElementById(
       "characterModal"
   );


const modalClose =
   document.getElementById(
       "modalClose"
   );


const modalAvatar =
   document.getElementById(
       "modalAvatar"
   );


const modalName =
   document.getElementById(
       "modalName"
   );


const modalCourse =
   document.getElementById(
       "modalCourse"
   );


const modalBio =
   document.getElementById(
       "modalBio"
   );


cards.forEach(
   card => {

       const button =
           card.querySelector(
               ".inspect-button"
           );


       button.addEventListener(
           "click",
           event => {

               event.stopPropagation();


               const name =
                   card
                       .querySelector(
                           ".student-info h2"
                       )
                       .textContent
                       .trim();


               const course =
                   card
                       .querySelector(
                           ".course"
                       )
                       .textContent
                       .trim();


               const bio =
                   card
                       .querySelector(
                           ".bio"
                       )
                       .textContent
                       .trim();


               modalAvatar.textContent =
                   name
                       .charAt(0)
                       .toUpperCase();


               modalName.textContent =
                   name;


               modalCourse.textContent =
                   course;


               modalBio.textContent =
                   bio;


               modal.classList.add(
                   "active"
               );


               document.body.style.overflow =
                   "hidden";

           }
       );

   }
);


function closeModal() {

   modal.classList.remove(
       "active"
   );


   if (entered) {

       document.body.style.overflow =
           "";

   }

}


modalClose.addEventListener(
   "click",
   closeModal
);


modal.addEventListener(
   "click",
   event => {

       if (
           event.target === modal
       ) {

           closeModal();

       }

   }
);


document.addEventListener(
   "keydown",
   event => {

       if (
           event.key ===
           "Escape"
           &&
           modal.classList.contains(
               "active"
           )
       ) {

           event.stopPropagation();

           closeModal();

       }

   }
);


/* ============================================================
  CURSOR INTERATIVO
  ============================================================ */

const interactiveElements =
   document.querySelectorAll(
       `
       button,
       input,
       select,
       .character-card
       `
   );


interactiveElements.forEach(
   element => {

       element.addEventListener(
           "mouseenter",
           () => {

               cursorGlow.style.width =
                   "55px";


               cursorGlow.style.height =
                   "55px";


               cursorGlow.style.borderColor =
                   "rgba(72,200,255,.6)";

           }
       );


       element.addEventListener(
           "mouseleave",
           () => {

               cursorGlow.style.width =
                   "38px";


               cursorGlow.style.height =
                   "38px";


               cursorGlow.style.borderColor =
                   "rgba(157,108,255,.35)";

           }
       );

   }
);
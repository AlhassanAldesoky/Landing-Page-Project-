/* 
   Testing if Js file is correctly attached
*/
document.addEventListener("click", function () {
  console.log("The document was clicked");
});

// Define Global Variables
let allSections = [...document.getElementsByTagName("section")];
const navBarList = document.getElementById("navbar__list");
let listItem;
const viewPortHeight = document.documentElement.clientHeight;

// >> HELPER FUNCTIONS

// 1-Function to check if an element is in viewport
function isScrolledIntoView(element) {
  const dimensions = element.getBoundingClientRect();
  const top = dimensions.top;
  const isVisible = top >= -400 && top <= 150;
  return isVisible;
}

// 2-Function takes an id of an element and adds an active class to this element
function addClass(id) {
  const select = `nav li a[href="#${id}"]`;
  const selected = document.querySelector(select);
  selected.classList.add("your-active-class");
}

// 3-Function takes an id of an element and removes the active class from this element
function removeClass(id) {
  const select = `nav li a[href="#${id}"]`;
  const selected = document.querySelector(select);
  selected.classList.remove("your-active-class");
}

//  MAIN FUNCTIONS

// 1-Build the nav
function createNavBarItems() {
  allSections.forEach(function (section, i) {
    listItem = document.createElement("li");
    listItem.classList.add("navbar__menu");
    listItem.innerHTML = `<a href="#${section.id}" data-nav="${
      section.id
    }" class= "menu__link"> Section ${i + 1} </a>`;
    navBarList.appendChild(listItem);
  });
}
createNavBarItems();

// 2-Add class (your-active-class) to section and nav item when near top of viewport
window.onscroll = function () {
  for (section of allSections) {
    const Id = section.attributes.id.value;
    if (isScrolledIntoView(section)) {
      section.classList.add("your-active-class");
      mybutton.style.display = section.id !== "section1" ? "block" : "none";
      addClass(Id);
    } else {
      section.classList.remove("your-active-class");
      removeClass(Id);
    }
  }

};
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
//window.onscroll = function() {scrollFunction()};

/*function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}*/

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//  EVENTS

// Event Listner to prevent the default behaviour of jumping to the section upon clicking, instead, scroll to it
navBarList.addEventListener("click", function (et) {
  et.preventDefault();
  // defining a constant and assigning its value to the event target which is the list item which contains the dataset 'nav': (data-nav)
  const target = et.target.dataset.nav;
  if (target) {
    /* defining constant ID and assigning its value to the id of the clicked listitem,
        which is also the id of the section the page will scroll to when the user clicks it from the bar */
    const ID = document.getElementById(`${target}`);
    ID.scrollIntoView({
      behavior: "smooth",
    });
    // wait a very short time before scrolling to section for better user experience
    setTimeout(function wait() {
      location.hash = `${target}`;
    }, 222);
  }
});


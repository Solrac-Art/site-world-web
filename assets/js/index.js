// Definitions -->

// slides ###
const panel = document.querySelector(".about ");
const slides = document.querySelectorAll(".slides .slide");
const firstSlide = slides[0];
let currentSlide = 0;
let slidesRolling = true;

const btnPrev = document.querySelector(".about .container>button.btn-prev");
const btnNext = document.querySelector(".about .container>button.btn-next");
const controls = document.querySelector(".about .container .controls");


let firstClick, endClick;

// open menu ###
const menu = document.querySelector(".header-part-2 nav .menu");
const btnOpenMenu = document.querySelector(".header-part-2 nav>button[arial-label=menu]");
const btnCloseMenu = document.querySelector(".header-part-2 nav .menu button[arial-label=fechar-menu]");

const linksMenu = document.querySelectorAll(".header-part-2 nav .menu li a ");

//  ScrollReveal ###

const scrollReveal = ScrollReveal({
    // origin: "left",
    distance: "25px",
    duration: 700,
    reset: true,
    opacity: 0
});

// Functions -->

// slides ###
function slidePrev() {
    currentSlide--
    slidesRolling = false;

    verifySlide();
}

function slideNext() {
    currentSlide++
    slidesRolling = false;

    verifySlide();
}

function verifySlide() {
    if (currentSlide > slides.length - 1) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    firstSlide.style.marginLeft = (-currentSlide * 100) + "vw";

    document.querySelectorAll(".about .controls button").forEach((element) => {
        element.classList.remove("current");
    });
    document.getElementById(currentSlide).classList.add("current");

}

function createButtons() {
    slides.forEach((buttons, index) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("id", index);
        button.setAttribute("aria-label", "slide " + (index + 1));
        // if (index == 0) button.setAttribute("class", "current");

        button.addEventListener("click", ({ target }) => {
            let currentBtn = target;
            currentSlide = currentBtn.getAttribute("id");
            verifySlide();
            slidesRolling = false;
        })

        controls.appendChild(button);
    })
}

// open menu ###

function openMenu() {
    menu.classList.toggle("open");
}

function linksMenuActions() {
    linksMenu.forEach((element) => {
        if (window.outerWidth < 768) {
            element.addEventListener("click", () => {
                menu.classList.remove("open");
            })
        }
    })
}


// Events listiners -->
window.addEventListener("load", () => {
    createButtons()
    firstSlide.classList.add("first");
    verifySlide();
    linksMenuActions()


    setInterval(() => {
        if (slidesRolling) {
            slideNext();
        } else {
            slidesRolling = true;
        }
    }, 4000);


    //ScrollReveal###
    scrollReveal.reveal(`
.header-part-1 .logo, .header-part-1 .social ul li,
.header-part-2 nav .menu li, .header-part-2 .search .social, .search button,
main .services .container>div:first-child p,
main .services .container>div:last-child .card, 
main .jobs .container .card, 
footer .footer-part-1 .container>div,
footer .footer-part-2 p,
.footer-part-2 .social ul li
`, {
        interval: 50,
        origin: "left"
    });

    scrollReveal.reveal(`
.about .container>button, .about .container .controls button,
main .services .container>div:first-child p, 
.imterpresi .container ul li
 `, {
        interval: 50,
        origin: "bottom"
    });
})


// slides ###
btnPrev.addEventListener("click", slidePrev);

btnNext.addEventListener("click", slideNext);




// open menu ###

btnOpenMenu.addEventListener("click", openMenu);
btnCloseMenu.addEventListener("click", openMenu);


panel.addEventListener("touchstart", (action) => {
    firstClick = action.touches[0].clientX;

});

panel.addEventListener("touchmove", (action) => {
    endClick = action.touches[0].clientX;

});

panel.addEventListener("touchend", (action) => {
    if (endClick === firstClick) {
        console.log("Clico no mesmo lugar.");
    } else {
        if (endClick < firstClick - 100) {
            slideNext()

        } else if (endClick > firstClick + 100) {
            slidePrev()
        }
    }
});
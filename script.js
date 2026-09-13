const images = [
    "imgs/1.jpg",
    "imgs/2.jpg",
    "imgs/3.jpg",
    "imgs/4.jpg",
    "imgs/5.jpg",
    "imgs/6.jpg",
    "imgs/7.jpg"
];

const slider = document.querySelector("[data-slider]");
const prvBtn = document.querySelector("[data-btn-prv]");
const nxtBtn = document.querySelector("[data-btn-nxt]");

let currentIndex = 0;

const animationTime = 0.5;

const setupSlides = () => {
    images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.classList.add(`image`);
        img.src = imageUrl;
        img.dataset.index = index;
        img.alt = `slide ${index + 1}`;

        slider.appendChild(img);
    })

    const firstClone = slider.firstElementChild.cloneNode(true);
    const lastClone = slider.lastElementChild.cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstChild);
};

const initSlider = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    slider.style.transition = `none`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
};

const goToPrvSlide = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    currentIndex--;
    slider.style.transition = `translate ${animationTime}s ease-in-out`
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`
                nxtBtn.disabled = false;
            }
        },
        {once: true}
    );
};

const goToNxtSlide = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    currentIndex++;
    slider.style.transition = `translate ${animationTime}s ease-in-out`
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

    if (currentIndex >= images.length) {
        nxtBtn.disabled = true;
    }

    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex >= images.length) {
                currentIndex = 0;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`
                nxtBtn.disabled = false;
            }
        },
        {once: true}
    );
};

prvBtn.addEventListener("click", goToPrvSlide);
nxtBtn.addEventListener("click", goToNxtSlide);



prvBtn.addEventListener("click", () => {
    
});

setupSlides();
initSlider();

window.addEventListener("resize", initSlider);

document.addEventListener("click", function() {
    const audio = document.getElementById("bg-music");
    audio.play().catch(error => {
        console.log("Blocked by browser")
    });
}, {once: true});


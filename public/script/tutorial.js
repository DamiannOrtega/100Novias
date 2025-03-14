document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentSlide);
        });
    }

    document.getElementById("next").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    });

    document.getElementById("prev").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    });

    updateSlides(); // Asegura que solo el primer slide esté activo al inicio
});

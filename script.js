// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  console.log(e);
});

// Javascript to dynamically calculate translate based on content for true infinite
// (Optional: helps the animation adapt if you change number of feedback cards)
(function infiniteFeedbackCarousel() {
  const carousel = document.getElementById("feedback-carousel");
  if (!carousel) return;
  function restartAnim() {
    carousel.style.animation = "none";
    // It needs a bit to reset
    void carousel.offsetWidth;
    carousel.style.animation = "";
  }
  // Pause on hover (optional UX)
  carousel.parentElement.addEventListener(
    "mouseenter",
    () => (carousel.style.animationPlayState = "paused"),
  );
  carousel.parentElement.addEventListener(
    "mouseleave",
    () => (carousel.style.animationPlayState = "running"),
  );
  // Responsive: recalculate on resize if you change number of cards/widths
  window.addEventListener("resize", restartAnim);
})();

// Smooth FAQ accordion with animation
// On load, ensure all .faq-answer are closed and overflow is fine
document.querySelectorAll(".faq-answer").forEach((ans) => {
  ans.classList.remove("open");
});

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", function () {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains("open");
    // Close all
    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.classList.remove("open");
      a.previousElementSibling.setAttribute("aria-expanded", "false");
      a.previousElementSibling.querySelector(".faq-arrow").style.transform = "";
    });
    // Open this if wasn't already open
    if (!isOpen) {
      answer.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      this.querySelector(".faq-arrow").style.transform = "rotate(180deg)";
    }
  });
});

// Optionally, fix margin-jump for open answers by adjusting height on resize
window.addEventListener("resize", () => {
  document.querySelectorAll(".faq-answer.open").forEach((a) => {
    // If it's currently open, force a reflow to keep smooth
    a.style.maxHeight = a.scrollHeight + "px";
    // Remove style after brief timeout to allow transition
    setTimeout(() => {
      a.style.maxHeight = "";
    }, 350);
  });
});

 // Menu DOM
 const menuBtn = document.getElementById("mobile-menu-btn");
 const mobileMenu = document.getElementById("mobile-menu");
 const closeMenu = document.getElementById("close-mobile-menu");
 const mobileOverlay = document.getElementById("mobile-menu-overlay");
 function openMenu() {
   mobileMenu.classList.remove("translate-x-full");
   mobileMenu.classList.add("translate-x-0");
   mobileOverlay.classList.remove("hidden");
   mobileOverlay.classList.add("block");
   document.body.classList.add("overflow-hidden");
 }
 function closeMenuFunc() {
   mobileMenu.classList.add("translate-x-full");
   mobileMenu.classList.remove("translate-x-0");
   mobileOverlay.classList.remove("block");
   mobileOverlay.classList.add("hidden");
   document.body.classList.remove("overflow-hidden");
 }
 menuBtn.addEventListener("click", openMenu);
 closeMenu.addEventListener("click", closeMenuFunc);
 mobileOverlay.addEventListener("click", closeMenuFunc);
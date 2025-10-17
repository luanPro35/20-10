// Lấy các phần tử
const card = document.getElementById("card");
const container = document.getElementById("container");
const envelope = document.getElementById("envelope");
const backButton = document.getElementById("backButton");
const flowerAnimation = document.getElementById("flowerAnimation");
const body = document.body;

let isOpened = false;

// Tải và khởi tạo animation hoa từ JSON
let flowerAnimationData = null;
let flowerAnimationInstance = null;

// Tải dữ liệu animation hoa
fetch("Flower Animation.json")
  .then((response) => response.json())
  .then((data) => {
    flowerAnimationData = data;
  })
  .catch((error) => console.error("Lỗi khi tải animation hoa:", error));

// Hàm để chạy animation hoa
function playFlowerAnimation() {
  if (!flowerAnimationData) return false;

  // Hiển thị container animation
  flowerAnimation.classList.add("active");

  // Tạo animation từ dữ liệu JSON
  flowerAnimationInstance = lottie.loadAnimation({
    container: flowerAnimation,
    renderer: "svg",
    loop: false,
    autoplay: true,
    animationData: flowerAnimationData,
  });

  return true;
}

// Xử lý khi click vào phong bì để mở
envelope.addEventListener("click", () => {
  if (!isOpened) {
    isOpened = true;

    // Bước 1: Mở nắp phong bì
    envelope.classList.add("open");

    // Bước 2: Sau 0.5s, chạy animation hoa
    setTimeout(() => {
      const animationStarted = playFlowerAnimation();

      // Nếu animation không thể chạy, chuyển sang hiển thị thiệp ngay
      if (!animationStarted) {
        body.classList.add("card-out");
        createConfetti();
      } else {
        // Bước 3: Sau khi animation hoa hoàn thành (3s), hiển thị thiệp
        setTimeout(() => {
          body.classList.add("card-out");
          // Tạo confetti khi thiệp xuất hiện
          createConfetti();
        }, 3000);
      }
    }, 500);
  }
});

// Xử lý khi click vào thiệp - lật thiệp
card.addEventListener("click", (e) => {
  if (
    body.classList.contains("card-out") &&
    e.target !== backButton &&
    !backButton.contains(e.target)
  ) {
    card.classList.toggle("flipped");
  }
});

// Xử lý khi click nút "Cất vào phong bì"
backButton.addEventListener("click", (e) => {
  e.stopPropagation();

  // Reset tất cả trạng thái
  body.classList.remove("card-out");
  envelope.classList.remove("open");

  // Ẩn và reset animation hoa
  flowerAnimation.classList.remove("active");
  if (flowerAnimationInstance) {
    flowerAnimationInstance.destroy();
    flowerAnimationInstance = null;
  }

  setTimeout(() => {
    card.classList.remove("flipped");
    isOpened = false;
  }, 1200);
});

// Tạo cánh hoa rơi
function createFallingPetal() {
  const petalContainer = document.querySelector(".petals-falling");
  const petal = document.createElement("div");

  petal.style.position = "absolute";
  petal.style.width = "15px";
  petal.style.height = "15px";
  petal.style.background = "linear-gradient(45deg, #ff69b4, #ff1493)";
  petal.style.borderRadius = "50% 0 50% 0";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.top = "-20px";
  petal.style.opacity = Math.random() * 0.5 + 0.3;
  petal.style.animation = `petalFall ${Math.random() * 3 + 4}s linear`;

  petalContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 7000);
}

// Tạo animation rơi cho cánh hoa
const style = document.createElement("style");
style.textContent = `
    @keyframes petalFall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Tạo cánh hoa rơi liên tục
setInterval(createFallingPetal, 300);

// Tạo hiệu ứng lấp lánh khi di chuột trên thiệp
card.addEventListener("mousemove", function (e) {
  if (!card.classList.contains("flipped")) return;

  const x = e.clientX;
  const y = e.clientY;

  const sparkle = document.createElement("div");
  sparkle.style.position = "fixed";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.width = "5px";
  sparkle.style.height = "5px";
  sparkle.style.background = "white";
  sparkle.style.borderRadius = "50%";
  sparkle.style.pointerEvents = "none";
  sparkle.style.animation = "sparkleAnimation 0.6s ease-out";
  sparkle.style.zIndex = "9999";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 600);
});

// Animation cho hiệu ứng lấp lánh
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Tạo particles nền
function createParticles() {
  const particlesContainer = document.getElementById("particles");

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Khởi tạo particles khi trang load
createParticles();

// Thêm hiệu ứng confetti khi mở thiệp
function createConfetti() {
  const colors = ["#ff1493", "#ff69b4", "#ffd700", "#ff6b9d", "#ffa8d8"];

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = "50%";
      confetti.style.top = "50%";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "1001";

      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;
      const tx = Math.cos(angle) * velocity * 50;
      const ty = Math.sin(angle) * velocity * 50;

      confetti.style.animation = `confettiExplode 1.5s ease-out forwards`;
      confetti.style.setProperty("--tx", tx + "px");
      confetti.style.setProperty("--ty", ty + "px");

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 1500);
    }, i * 20);
  }
}

// Thêm CSS cho confetti animation
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
    @keyframes confettiExplode {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Thêm hiệu ứng âm thanh khi mở (tùy chọn)
function playOpenSound() {
  // Bạn có thể thêm âm thanh ở đây nếu muốn
  // const audio = new Audio('open-sound.mp3');
  // audio.play();
}

// Thêm hiệu ứng rung nhẹ cho phong bì khi hover
envelope.addEventListener("mouseenter", () => {
  if (!isOpened) {
    envelope.style.animation = "envelopeShake 0.5s ease";
  }
});

envelope.addEventListener("animationend", () => {
  envelope.style.animation = "";
});

// Thêm CSS cho shake animation
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
    @keyframes envelopeShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

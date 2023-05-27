function changeBanner() {
    const numOfImgs = 5;
    let intervalId;
    let img = document.querySelector("#logo .img_wrapper img");
    let src = img.getAttribute("src");
    let n = parseInt(src.match(/\d+/)[0]);

    function changeImage(direction) {
        if (direction === "forward") {
            n = (n % numOfImgs) + 1;
        } else if (direction === "backward") {
            n = (n + numOfImgs - 2) % numOfImgs + 1;
        }

        src = src.replace(/\d+/, n);
        img.setAttribute("src", src);
    }

    function startInterval() {
        intervalId = setInterval(() => changeImage("forward"), 5000);
    }

    document.addEventListener("DOMContentLoaded", function () {
        let backward = document.querySelector(".arrow_backward");
        let forward = document.querySelector(".arrow_forward");

        backward.addEventListener("click", function () {
            changeImage("backward");
            clearInterval(intervalId);
            startInterval();
        });

        forward.addEventListener("click", function () {
            changeImage("forward");
            clearInterval(intervalId);
            startInterval();
        });
    });

    startInterval();
}

function animateBackground() {
    let imgWrapper = document.querySelector("#logo .img_wrapper");
    let colors = ["#00959140", "#00959160", "#00959170", "#00959180", "#00959190", "#009591AA", "#009591BB", "#009591CC", "#009591DD", "#009591EE", "#009591FF"];
    colors = colors.concat(colors);
    let currentIndex = 0;

    setInterval(function () {
        imgWrapper.style.backgroundImage = "linear-gradient(135deg, " + colors.slice(currentIndex, currentIndex + 5) + ")";
        currentIndex = (currentIndex + 1) % (colors.length / 2);
    }, 100); // 0.1초마다 색상 변경
}

function preventSelectionOnDoubleClick() {
    document.addEventListener("mousedown", function (event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    });
}

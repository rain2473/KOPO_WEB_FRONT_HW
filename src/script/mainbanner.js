function changeBanner() {
    const numOfImgs = 3;
    let img = document.querySelector("#logo .img_wrapper img");
    let currentSrc = img.getAttribute("src");
    let n = parseInt(currentSrc.match(/\d+/)[0]);
    let nextN = (n % numOfImgs);
    let nextSrc;
    let intervalId;

    function startInterval() {
        intervalId = setInterval(function () {
            nextN = (nextN % numOfImgs) + 1;
            nextSrc = currentSrc.replace(/\d+/, nextN);
            img.setAttribute("src", nextSrc);
        }, 5000);
    }

    function stopInterval() {
        clearInterval(intervalId);
    }

    document.addEventListener("DOMContentLoaded", function () {
        let backward = document.querySelector(".arrow_backward");
        let forward = document.querySelector(".arrow_forward");

        backward.addEventListener("click", function () {
            nextN = (nextN + numOfImgs - 2) % numOfImgs + 1;
            nextSrc = currentSrc.replace(/\d+/, nextN);
            img.setAttribute("src", nextSrc);
            stopInterval();
            startInterval();
        });

        forward.addEventListener("click", function () {
            nextN = (nextN % numOfImgs) + 1;
            nextSrc = currentSrc.replace(/\d+/, nextN);
            img.setAttribute("src", nextSrc);
            stopInterval();
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

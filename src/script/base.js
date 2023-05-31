function linkToPage() {
    $(document).ready(function () {
        $(".link-wrapper").click(function () {
            var url = $(this).data("href");
            if (!url) {
                alert(`${url}이 존재하지 않습니다!`);
            }
            if (url.indexOf("http") === 0 || url.indexOf("https") === 0) {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }
        });
    });
}

function cursorChange() {
    document.addEventListener("DOMContentLoaded", function () {
        let arrows = document.querySelectorAll(".arrow_backward, .arrow_forward, .link-wrapper, .select");

        arrows.forEach(function (arrow) {
            arrow.addEventListener("mouseenter", function () {
                arrow.style.cursor = "pointer";
            });

            arrow.addEventListener("mouseleave", function () {
                arrow.style.cursor = "auto";
            });
        });
    });
}

function scrollTopFixed() {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("#top_button")
        .addEventListener("click", function () {
            window.scrollTo(0, 0);
        });
    });
}

function animateBackground() {
    let imgWrapper = document.querySelector("#logo .img_wrapper");
    let colors = ["#00959140", "#00959160", "#00959170", "#00959180", "#00959190", "#009591AA", "#009591BB", "#009591CC", "#009591DD", "#009591EE", "#009591FF"];
    colors = colors.concat(colors);
    let currentIndex = 0;

    setInterval(function () {
        imgWrapper.style.backgroundImage = "linear-gradient(135deg, " + colors.slice(currentIndex, currentIndex + 5) + ")";
        currentIndex = (currentIndex + 1) % (colors.length / 2);
    }, 100);
}

function preventSelectionOnDoubleClick() {
    document.addEventListener("mousedown", function (event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    });
}
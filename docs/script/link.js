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
        let arrows = document.querySelectorAll(".arrow_backward, .arrow_forward, .link-wrapper");

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

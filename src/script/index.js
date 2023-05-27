function disableStyle(selector) {
    const subjectElement = document.querySelector(selector);
    subjectElement.classList.add("disable-after");
}

function typingSubject(letters, selector, checkSubtitle) {
    const $text = document.querySelector(selector);
    const speed = 100;
    let i = 0;

    const typing = async () => {
        const letter = changeLineBreak(letters[i].split(""));

        while (letter.length) {
            await wait(speed);
            $text.innerHTML += letter.shift();
        }
        await wait(800);
        if (letters[i + 1]) {
            remove();
        }
        else if (!checkSubtitle) {
            disableStyle("#subject");
            typingSubject(["환영합니다"], "#subtitle", true);
        }
        else {
            disableStyle("#subtitle");
        }
    }

    const remove = async () => {
        const letter = letters[i].split("");

        while (letter.length) {
            await wait(speed);
            letter.pop();
            $text.innerHTML = letter.join("");
        }
        i++;
        typing();
    }

    function wait(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    const changeLineBreak = (letter) => {
        return letter.map(text => text === "\n" ? "<br>" : text);
    }

    setTimeout(typing, 1500);
}
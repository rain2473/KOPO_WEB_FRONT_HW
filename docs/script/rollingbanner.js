function rollingBanner() {
    let roller1;
    let roller2;
    let rollerWidth = document.querySelector('.roller ul').offsetWidth;
    let betweenDistance = 1;

    let roller = document.querySelector('.roller');
    roller.id = 'roller1';
    
    let clone = roller.cloneNode(true);
    clone.id = 'roller2';
    document.querySelector('.wrap').appendChild(clone);

    roller1 = document.querySelector('#roller1');
    roller2 = document.querySelector('#roller2');

    document.querySelector('#roller1').style.left = '0px';
    document.querySelector('#roller2').style.left = rollerWidth + 'px';

    roller.classList.add('original');
    clone.classList.add('clone');

    originalID = window.setInterval(betweenRollCallback, parseInt(1000 / 100), betweenDistance, roller1);
    cloneID = window.setInterval(betweenRollCallback, parseInt(1000 / 100), betweenDistance, roller2);

    function betweenRollCallback(d, roller) {
        let left = parseInt(roller.style.left);
        roller.style.left = (left - d) + 'px';
            if (rollerWidth + (left - d) <= 0) {
            roller.style.left = 2 * rollerWidth + (left - d) + 'px';
        }
    }
}
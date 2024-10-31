function loadBasicHTML() {
    document.getElementById('loading-screen').style.display = 'none';
    document.body.style.backgroundImage = 'none';
    const allElements = document.querySelectorAll('*:not(#site-info):not(#site-info *):not(#loading-screen):not(#loading-screen *)');
    allElements.forEach(element => {
        element.style.cssText = '';
    });
    // Disable the stylesheet
    const stylesheet = document.querySelector('link[rel="stylesheet"]');
    if (stylesheet) {
        stylesheet.disabled = true;
    }
    }

    window.addEventListener('load', function() {
    const backgroundImage = new Image();
    backgroundImage.src = 'resources/site/Images/divbg1.png';
    backgroundImage.onload = function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.body.style.backgroundImage = `url(${backgroundImage.src})`;
    };
    });
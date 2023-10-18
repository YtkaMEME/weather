import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

let animation = lottieWeb.loadAnimation({
    container: document.querySelector('.mainLogo'),
    path: 'https://lottie.host/3bbdabac-99db-42df-a44b-05a6c1d7ec32/Y2gfHPoFMx.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
    name: "MainLogo",
});

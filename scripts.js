document
  .getElementById('recommendButton')
  .addEventListener('click', function () {
    const bodyType = document.getElementById('bodyType').value;
    const skinTone = document.getElementById('skinTone').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const occasion = document.getElementById('occasion').value;

    // Send selections to the Python back-end
    fetch('/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bodyType,
        skinTone,
        gender,
        height,
        weight,
        occasion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display recommendations and image received from the back-end
        document.getElementById('recommendations').innerHTML =
          data.recommendation;

        if (data.image_url) {
          document.getElementById(
            'recommendationImage'
          ).innerHTML = `<img src="${data.image_url}" alt="Fashion Recommendation">`;
        } else {
          document.getElementById('recommendationImage').innerHTML =
            'No image available.';
        }
      });
  });

function videoconAnimation() {
  var videocon = document.querySelector('#parent-pic');
  var playbtn = document.querySelector('#PLAY');
  videocon.addEventListener('mouseenter', function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener('mouseleave', function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  document.addEventListener('mousemove', function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 30,
      top: dets.y - 45,
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from('#page1 h1', {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from('#parent-pic #video-container', {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}
loadinganimation();

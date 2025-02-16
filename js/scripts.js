$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const imageFolder = 'img/specials/';
    const imageCount = 10; // Assume there are 10 images in the folder
    const images = [];
  
    for (let i = 1; i <= imageCount; i++) {
      images.push(`${imageFolder}${i}.jpeg`);
    }
  
    const carouselInner = document.querySelector('.carousel-inner');
    let currentIndex = 0;
  
    function createCarouselItem(index) {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (index === currentIndex) item.classList.add('active');
  
      const row = document.createElement('div');
      row.classList.add('row');
  
      for (let i = 0; i < 6; i++) { // Change 3 to 5
        const col = document.createElement('div');
        col.classList.add('col-2'); // Adjust column width to fit 5 images
  
        const a = document.createElement('a');
        a.href = images[(index + i) % images.length];
        a.setAttribute('data-toggle', 'lightbox');
        a.setAttribute('data-gallery', 'example-gallery');
  
        const img = document.createElement('img');
        img.src = images[(index + i) % images.length];
        img.classList.add('d-block', 'w-100');
        img.alt = `Dish ${(index + i) % images.length + 1}`;
  
        a.appendChild(img);
        col.appendChild(a);
        row.appendChild(col);
      }
  
      item.appendChild(row);
      return item;
    }
  
    function updateCarousel() {
      carouselInner.innerHTML = '';
      carouselInner.appendChild(createCarouselItem(currentIndex));
    }
  
    updateCarousel();
  
    document.querySelector('.carousel-control-next').addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  
    document.querySelector('.carousel-control-prev').addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('#bs-example-navbar-collapse-1');
  
    // Close the navbar when a link is clicked
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('in')) {
          navbarCollapse.classList.remove('in');
          navbarCollapse.classList.add('collapse');
        }
      });
    });
  
    $(document).ready(function () {
      $('.navbar-nav li a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
  
      $('.navbar-toggle').on('click', function () {
        if ($('.navbar-collapse').hasClass('in')) {
          $('.navbar-collapse').collapse('hide');
        } else {
          $('.navbar-collapse').collapse('show');
        }
      });
  
      $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
  
        $.ajax({
          type: 'POST',
          url: 'mail/contact_me.php',
          data: formData,
          dataType: 'json',
          encode: true,
          success: function(response) {
            $('#formMessages').removeClass('alert-danger').addClass('alert-success').text(response.message);
          },
          error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            $('#formMessages').removeClass('alert-success').addClass('alert-danger').text('Error - ' + errorMessage);
          }
        });
      });
    });
  
    document.getElementById('sendMessageButton').addEventListener('click', function() {
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;
      const email = 'orders@doracatering.ro';
      const ccEmail = 'cornelse24ro@yahoo.com';
      const subject = encodeURIComponent(`Message from ${name}`);
      const body = encodeURIComponent(message);
  
      const mailtoLink = `mailto:${email}?cc=${ccEmail}&subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    });
  });
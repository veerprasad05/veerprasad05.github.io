$(document).ready(function () {
  var words = ["Student", "Web Dev", "Tennis Player"];
  var i = 0;
  var txt = '';
  var wordIndex = 0;
  var isDeleting = false;

  function type() {
    var current = words[wordIndex];
    if (isDeleting) {
      txt = current.substring(0, txt.length - 1);
    } else {
      txt = current.substring(0, txt.length + 1);
    }

    $('#typewriter-text').text(txt + '|');

    if (!isDeleting && txt === current) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  type();

  // Projects data
  const projects = [
    {
      title: "Live-Camera Face Recognition",
      hook: "Real-time face recognition with just a webcam and Python — no cloud, no hassle.",
      websiteUrl: "https://github.com/veerprasad05/dlib-face-recognition",
      image: "assets/face_recog_proj_image.png",
      summary: "A lightweight Python pipeline for live face detection, encoding, and identification.",
      details: [
        "Captures 60 images per user for training, enabling robust identity representation.",
        "Achieves up to 80%+ confidence in real-time face identification using HOG-based encoding and vector matching.",
        "Fully on-device, low-latency processing — ideal for privacy-sensitive or offline environments."
      ],
      tags: ["facenet-pytorch", "dlib", "face_recognition", "OpenCV"]
    },
    {
      title: "Privacy & Face Blurring Software",
      hook: "Turn any webcam into a smart, privacy-aware face cam in under five minutes.",
      websiteUrl: "https://github.com/veerprasad05/mtcnn-face-blurring",
      image: "assets/face_blurring_image.png",
      summary: "A cross-platform Python toolkit that demos real-time face detection, landmarking and automatic blur masking using OpenCV, PyTorch and facenet-pytorch.",
      details: [
        "Live video pipeline with <30 ms face-box and landmark inference via MTCNN on CPU or GPU. ​",
        "Automatic Gaussian blurring of detected faces for GDPR-friendly streaming or recording. ",
        "Pure-Python, <300 LOC, runs unchanged on Linux, macOS and Windows with a single pip install set."
      ],
      tags: ["MTCNNs", "Face Detection", "Python"]
    },
  ];

  // Generate project cards
  function generateProjectCards() {
    const container = $('.projects-container');
    container.empty(); // Clear existing content

    projects.forEach((project, index) => {
      // Create project card HTML
      const projectCard = `
        <div class="project-card" data-index="${index}">
          <div class="project-image-container">
            <div class="project-hook">${project.hook}</div>
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <button class="see-website-btn">See Github</button>
          </div>
          <div class="project-content">
            <a href=${project.websiteUrl} target="_blank"><h3 class="project-title">${project.title}</h3></a>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-details">
              ${project.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      
      container.append(projectCard);
    });

    // Initialize spotlight effect
    initSpotlightEffect();
  }

  // Initialize spotlight effect for project images
  function initSpotlightEffect() {
    // Add the tint class to all project image containers
    $('.project-image-container').addClass('tint');

    // Handle mouse enter
    $('.project-image-container').on('mouseenter', function() {
      $(this).addClass('active');
    });

    // Handle mouse leave
    $('.project-image-container').on('mouseleave', function() {
      $(this).removeClass('active');
      
      // Reset to center position when mouse leaves
      $(this).css('--mouse-x', '50%');
      $(this).css('--mouse-y', '50%');
    });

    // Handle mouse movement
    $('.project-image-container').on('mousemove', function(e) {
      // Get the container's position and dimensions
      const rect = e.currentTarget.getBoundingClientRect();
      
      // Calculate mouse position as percentages of container width/height
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update CSS variables for the spotlight position
      $(this).css('--mouse-x', x + '%');
      $(this).css('--mouse-y', y + '%');
    });
  }

  // Initialize
  generateProjectCards();

  // Add event listeners for See Website buttons
  $(document).on('click', '.see-website-btn', function(e) {
    e.stopPropagation(); // Prevent triggering the parent container click
    const index = $(this).closest('.project-card').data('index');
    window.open(projects[index].websiteUrl, '_blank');
  });

  // Add event listener for container click (alternative to button click)
  $(document).on('click', '.project-image-container', function(e) {
    if (!$(e.target).hasClass('see-website-btn')) {
      const index = $(this).closest('.project-card').data('index');
      window.open(projects[index].websiteUrl, '_blank');
    }
  });
});
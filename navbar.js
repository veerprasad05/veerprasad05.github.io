// Place this in a new file: navbar.js
$(document).ready(function() {
  // 1. Add active class to navbar items based on scroll position
  function updateActiveNavItem() {
    const scrollPosition = $(window).scrollTop();
    
    // Subtract navbar height to account for fixed navbar
    const navbarHeight = $('.navbar').outerHeight();
    
    // Get all sections that have an ID defined
    $('section[id]').each(function() {
      const target = $(this);
      const sectionTop = target.offset().top - navbarHeight - 20; // Add a small offset
      const sectionHeight = target.outerHeight();
      const sectionId = target.attr('id');
      
      // Check if the section is currently visible in the viewport
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        $('.navbar-nav .nav-link').removeClass('active-section');
        
        // Add active class to the corresponding nav link
        $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active-section');
      }
    });
  }
  
  // Update active nav item on scroll
  $(window).on('scroll', updateActiveNavItem);
  
  // Update active nav item on page load
  updateActiveNavItem();
  
  // 4. Make the resume button open a PDF file
  // Add click event to all resume buttons (both in nav and hero section)
  $('.nav-link[href="#resume"], .btn-primary[href="#resume"]').on('click', function(e) {
    e.preventDefault();
    // Change 'assets/resume.pdf' to the actual path of your resume PDF
    window.open('assets/resume.pdf', '_blank');
  });
});
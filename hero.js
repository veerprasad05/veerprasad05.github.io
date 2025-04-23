// Add this to your effects.js file or create a new script
$(document).ready(function() {
  // Target all elements with the fw-bold class
  $('.fw-bold').each(function() {
    const text = $(this).text();
    let newHtml = '';
    
    // Loop through each character and wrap it in a span
    for (let i = 0; i < text.length; i++) {
      // Skip spaces to avoid awkward gaps
      if (text[i] === ' ') {
        newHtml += ' ';
      } else {
        newHtml += `<span class="letter-animation">${text[i]}</span>`;
      }
    }
    
    // Replace the original text with the letter-wrapped version
    $(this).html(newHtml);
  });
});
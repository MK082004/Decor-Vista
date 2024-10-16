const html = document.documentElement;
const labels = document.querySelectorAll('.field-wrap label');
labels.forEach(label => {
  const labelText = label.textContent;
  label.innerHTML = '';

  labelText.split('').forEach((letter, idx) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.transitionDelay = `${idx * 50}ms`;
    label.appendChild(span);
  });
});

// for field wrap input label script
document.addEventListener('DOMContentLoaded', function () {
  const fieldWraps = document.querySelectorAll('.field-wrap');
  if (fieldWraps) {
    fieldWraps.forEach((fieldWrap) => {
      const fieldInput = fieldWrap.querySelector('.field-input');
      const fieldLabel = fieldWrap.querySelector('.field-label');
      const fieldIcon = fieldWrap.querySelector('.field-icon');

      // Add a check for fieldInput before adding the event listener
      if (fieldInput) {
        fieldInput.addEventListener('input', () => {
          if (fieldInput.value.trim() !== '') {
            fieldLabel.classList.add('active');
            fieldInput.style.borderColor = "var(--primary)";
            fieldIcon.style.color = "var(--primary)";
          } else {
            fieldLabel.classList.remove('active');
            fieldInput.style.borderColor = "var(--white)";
            fieldIcon.style.color = "var(--white)";
          }
        });
      }
    });
  }
});

// Function to update breadcrumbs based on scroll position
function updateBreadcrumbs() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const breadcrumbs = document.getElementById('breadcrumbs');

  let visibleHeadings = [];
  let foundFirstH1 = false;

  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect();

    if (rect.top < window.innerHeight / 2) {
      if (heading.tagName === 'H1') {
        foundFirstH1 = true;
        visibleHeadings = []; // Clear previous headings when H1 is found
      }

      if (foundFirstH1) {
        const level = parseInt(heading.tagName.charAt(1));
        visibleHeadings = visibleHeadings.filter(item => item.level < level);
        const headingText = heading.textContent.replace(/#/g, '').trim(); // Remove trailing "#" and trim
        const headingId = heading.id || headingText.replace(/\s+/g, '-').toLowerCase();
        visibleHeadings.push({ level, text: headingText, id: headingId });
      }
    }
  });

  // Sort visibleHeadings by level
  visibleHeadings.sort((a, b) => a.level - b.level);

  breadcrumbs.innerHTML = ''; // Clear existing breadcrumbs

  for (let i = 0; i < visibleHeadings.length; i++) {
    const headingText = visibleHeadings[i].text;
    const headingId = visibleHeadings[i].id;

    const link = document.createElement('a');
    link.href = `#${headingId}`;
    link.textContent = headingText;

    // Add click event listener to each breadcrumb link
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Scroll to the corresponding heading with an offset of 50 pixels
      const targetHeading = document.getElementById(headingId);
      if (targetHeading) {
        const offset = targetHeading.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });

    const breadcrumbItem = document.createElement('div');
    breadcrumbItem.classList.add('breadcrumb-item');
    breadcrumbItem.appendChild(link);

    breadcrumbs.appendChild(breadcrumbItem);
  }

  // Toggle breadcrumbs visibility based on scroll position
  breadcrumbs.style.display = window.scrollY > 50 ? 'block' : 'none';
}

// Update breadcrumbs on scroll
window.addEventListener('scroll', updateBreadcrumbs);

// Initial update on page load
window.addEventListener('DOMContentLoaded', updateBreadcrumbs);

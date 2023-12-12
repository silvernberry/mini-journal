  // Function to update breadcrumbs based on scroll position
  function updateBreadcrumbs() {
    const headings = document.querySelectorAll('#journal h1, #journal h2, #journal h3, #journal h4, #journal h5, #journal h6');
    const breadcrumbs = document.getElementById('breadcrumbs');

    let visibleHeadings = [];

    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();

      if (rect.top < window.innerHeight / 2) {
        visibleHeadings.push(heading.textContent);
      }
    });

    const start = Math.max(visibleHeadings.length - 6, 0);

    breadcrumbs.innerHTML = ''; // Clear existing breadcrumbs

    for (let i = start; i < visibleHeadings.length; i++) {
      const breadcrumbItem = document.createElement('div');
      breadcrumbItem.classList.add('breadcrumb-item');
      breadcrumbItem.textContent = visibleHeadings[i];
      breadcrumbs.appendChild(breadcrumbItem);
    }

    // Toggle breadcrumbs visibility based on scroll position
    breadcrumbs.style.display = window.scrollY > 50 ? 'block' : 'none';
  }

  // Update breadcrumbs on scroll
  window.addEventListener('scroll', updateBreadcrumbs);

  // Initial update on page load
  window.addEventListener('DOMContentLoaded', updateBreadcrumbs);

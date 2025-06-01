document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const products = document.querySelectorAll('.product-images__section');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });

  function filterProducts() {
    // Collect active filters by category
    const filters = {
      type: getCheckedValues('type'),
      color: getCheckedValues('color'),
      arrival: getCheckedValues('arrival')
    };

    products.forEach(product => {
      const productType = product.getAttribute('data-type') || '';
      const productColor = product.getAttribute('data-color') || '';
      const productArrival = product.getAttribute('data-arrival') || '';

      const typeMatch = filters.type.length === 0 || filters.type.includes(productType);
      const colorMatch = filters.color.length === 0 || filters.color.some(color => productColor.includes(color));
      const arrivalMatch = filters.arrival.length === 0 || filters.arrival.includes(productArrival);

      if (typeMatch && colorMatch && arrivalMatch) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  function getCheckedValues(category) {
    return Array.from(document.querySelectorAll(`input[name="${category}"]:checked`)).map(cb => cb.value);
  }
});

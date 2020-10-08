Drupal.behaviors.searchForm = {
  attach(context) {
    const clearSearch = context.getElementById('search-clear');
    
    if (clearSearch) {
      // Clear search text.
      clearSearch.addEventListener('click', e => {
        const searchForm = e.currentTarget.previousElementSibling.previousElementSibling;
        const search = searchForm.querySelectorAll('.form-text');
        search.forEach((item) => {
          item.value = '';
        });
      });
    }
  },
};

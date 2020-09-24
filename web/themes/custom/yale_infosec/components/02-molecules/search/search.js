Drupal.behaviors.searchForm = {
  attach(context) {
    const clearSearch = context.getElementById('search-clear');
    
    // Clear search text.
    clearSearch.addEventListener('click', e => {
      const searchForm = e.currentTarget.nextElementSibling;
      const search = searchForm.querySelectorAll('.form-text');
      for (let i = 0; i < search.length; i += 1) {
        search[i].value = '';
      }
    });
  },
};

Drupal.behaviors.searchForm = {
  attach(context) {
    const clearSearch = context.getElementById('search-clear');
    const closeSearch = context.getElementById('search-close');
    const openSearch = context.getElementById('search-btn');
    
    // Clear search text.
    clearSearch.addEventListener('click', e => {
      const searchForm = e.currentTarget.nextElementSibling;
      const search = searchForm.querySelectorAll('.form-text');
      for (let i = 0; i < search.length; i += 1) {
        search[i].value = '';
      }
    });

    // Close Search.
    closeSearch.addEventListener('click', () => {
      const mainNav = context.getElementsByClassName('main-nav-search--open');

      for (let i = 0; i < mainNav.length; i += 1) {
        mainNav[i].classList.remove('main-nav-search--open')
      }

      openSearch.focus();
    });
  },
};

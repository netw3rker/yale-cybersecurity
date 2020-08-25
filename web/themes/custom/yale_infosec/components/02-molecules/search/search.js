Drupal.behaviors.search = {
  attach(context) {
    const clearSearch = context.getElementById('search-clear');
    const closeSearch = context.getElementById('search-close');
    const search = context.getElementById('edit-search');
    
    if (search) {
      // Clear search text.
      clearSearch.addEventListener('click', e => {
        search.value = '';
      });

      // Close Search.
      closeSearch.addEventListener('click', e => {
        const mainNav = context.getElementsByClassName('main-nav-search--open');

        for (let i = 0; i < mainNav.length; i += 1) {
          mainNav[i].classList.remove('main-nav-search--open')
        }
      });
    }
  },
};

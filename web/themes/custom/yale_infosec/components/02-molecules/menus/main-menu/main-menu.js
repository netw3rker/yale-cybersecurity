Drupal.behaviors.mainMenu = {
  attach(context) {
    const toggleExpand = context.getElementById('toggle-expand');
    const menu = context.getElementById('main-nav');
    if (menu) {
      const expandMenu = menu.getElementsByClassName('expand-sub');
      const backLinks = menu.getElementsByClassName('main-menu__parent-item');

      // Mobile Menu Show/Hide.
      toggleExpand.addEventListener('click', e => {
        toggleExpand.classList.toggle('toggle-expand--open');
        menu.classList.toggle('main-nav--open');
        e.preventDefault();
      });

      // Expose mobile sub menu on click.
      for (let i = 0; i < expandMenu.length; i += 1) {
        expandMenu[i].addEventListener('click', e => {
          const menuItem = e.currentTarget;
          const subMenu = menuItem.nextElementSibling;

          subMenu.classList.toggle('main-menu__child-menu--sub-open');
        });
      }

      // Back to parent links.
      for (let i = 0; i < backLinks.length; i += 1) {
        backLinks[i].addEventListener('click', e => {
          const backLink = e.currentTarget;
          const parentMenu = backLink.parentNode;
          parentMenu.classList.remove('main-menu__child-menu--sub-open');
        });
      }
    }
  },
};

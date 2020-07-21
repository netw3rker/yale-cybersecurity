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
          const currentMenu = document.getElementsByClassName('main-menu__child-menu--sub-current');

          for (let i = 0; i < currentMenu.length; i += 1) {
            currentMenu[i].classList.remove('main-menu__child-menu--sub-current');
          }

          subMenu.classList.toggle('main-menu__child-menu--sub-open');
          subMenu.classList.add('main-menu__child-menu--sub-current');
        });
      }

      // Back to parent links.
      for (let i = 0; i < backLinks.length; i += 1) {
        backLinks[i].addEventListener('click', e => {
          const backLink = e.currentTarget;
          const parentMenu = backLink.parentNode;
          const prevParentMenu = parentMenu.parentNode.parentNode.parentNode;

          parentMenu.classList.remove('main-menu__child-menu--sub-open');
          parentMenu.classList.remove('main-menu__child-menu--sub-current');
          prevParentMenu.classList.add('main-menu__child-menu--sub-current');
        });
      }
    }
  },
};

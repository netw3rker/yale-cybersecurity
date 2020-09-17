Drupal.behaviors.mainMenu = {
  attach(context) {
    const toggleExpand = context.getElementById('toggle-expand');
    const menu = context.getElementById('main-nav');
    const header = context.getElementById('site-header');
    const searchBtn = context.getElementById("search-btn");
    
    // If menu exists.
    if (menu) {
      const expandBtns = menu.getElementsByClassName('expand-sub');
      const backBtns = menu.getElementsByClassName('main-menu__parent-item');
      const topLevelLinks = menu.getElementsByClassName('main-menu__link--top');

      const currentSubClass = 'main-menu__child-menu--sub-current';
      const openSubClass = 'main-menu__child-menu--sub-open';

      closeCurrentMenus = () => {
        const currentMenus = document.getElementsByClassName(currentSubClass);

        for (let i = 0; i < currentMenus.length; i += 1) {
          currentMenus[i].classList.remove(currentSubClass);
        };
      }

      closeOpenMenus = () => {
        const openMenus = document.getElementsByClassName(openSubClass);

        for (let i = 0; i < openMenus.length; i += 1) {
          openMenus[i].classList.remove(openSubClass);
        };
      }

      // Mobile Menu Show/Hide.
      toggleExpand.addEventListener('click', e => {
        closeCurrentMenus();
        closeOpenMenus();

        toggleExpand.classList.toggle('toggle-expand--open');
        menu.classList.toggle('main-nav--open');
        header.classList.toggle('header--fixed');
        e.preventDefault();
      });

      // Expose mobile sub menu on click.
      for (let i = 0; i < expandBtns.length; i += 1) {
        expandBtns[i].addEventListener('click', e => {
          const menuItem = e.currentTarget;
          const subMenu = menuItem.nextElementSibling;
          
          closeCurrentMenus();

          subMenu.classList.toggle(openSubClass);
          subMenu.classList.toggle(currentSubClass);
          subMenu.firstElementChild.focus();
        });
      }

      // Back to parent links.
      for (let i = 0; i < backBtns.length; i += 1) {
        backBtns[i].addEventListener('click', e => {
          const backLink = e.currentTarget;
          const parent = backLink.parentNode;
          const parentMenu = parent.parentNode;
          const prevParentMenu = parentMenu.parentNode.parentNode.parentNode;

          parent.classList.remove(currentSubClass);
          parentMenu.classList.remove(openSubClass);
          parentMenu.classList.remove(currentSubClass);
          prevParentMenu.classList.add(currentSubClass);
        });
      }

      // Search button
      searchBtn.addEventListener('click', e => {
        const searchForm = e.currentTarget.nextElementSibling;
        const search = searchForm.querySelectorAll('.form-text');

        searchForm.classList.add('main-nav-search--open');
        for (let i = 0; i < search.length; i += 1) {
          search[i].focus();
        }
        searchForm.tabIndex = 0;
      });

      // Top Level Menu focus - close submenus.
      for (let i = 0; i < topLevelLinks.length; i += 1) {
        topLevelLinks[i].addEventListener('focus', e => {
          const activeLink = e.currentTarget;
          const activeMenu = activeLink.nextElementSibling.nextElementSibling;
          // If not current submenu, close submenu.
          if (!activeMenu.classList.contains(openSubClass)) {
            closeCurrentMenus();
            closeOpenMenus();
          }
        });
      }
    }
  },
};

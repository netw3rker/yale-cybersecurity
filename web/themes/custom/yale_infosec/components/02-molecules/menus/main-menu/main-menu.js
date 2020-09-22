Drupal.behaviors.mainMenu = {
  attach(context) {
    const toggleExpand = context.getElementById('toggle-expand');
    const menu = context.getElementById('main-nav');
    const header = context.getElementById('site-header');
    const searchBtn = context.getElementById("search-btn");

    // .closest() polyfill (IE11 requirement).
    if (window.Element && !Element.prototype.closest) {
      Element.prototype.closest =
      function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
              i,
              el = this;
          do {
              i = matches.length;
              while (--i >= 0 && matches.item(i) !== el) {};
          } while ((i < 0) && (el = el.parentElement));
          return el;
      };
    }
    
    // If menu exists.
    if (menu) {
      const expandBtns = menu.getElementsByClassName('expand-sub');
      const backBtns = menu.getElementsByClassName('main-menu__parent-item');
      const menuLinks = menu.getElementsByClassName('main-menu__link');

      const currentSubClass = 'main-menu__child-menu--sub-current';
      const openSubClass = 'main-menu__child-menu--sub-open';

      const closeCurrentMenus = () => {
        const currentMenus = document.getElementsByClassName(currentSubClass);

        for (let i = 0; i < currentMenus.length; i += 1) {
          currentMenus[i].classList.remove(currentSubClass);
        };
      }

      const closeOpenMenus = () => {
        const openMenus = document.getElementsByClassName(openSubClass);

        for (let i = 0; i < openMenus.length; i += 1) {
          openMenus[i].classList.remove(openSubClass);
        };
      }

      // If no parent menu exists, close all submenus (e.g., tab focus).
      const closeParentMenu = (e) => {
        const activeLink = e.currentTarget;
        const activeParentMenu = activeLink.closest('.main-menu__child-menu--sub-open');
        if (!activeParentMenu) {
          closeCurrentMenus();
          closeOpenMenus();
        }
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

      // On focus of menu links, close any unrelated submenus.
      for (let i = 0; i < menuLinks.length; i += 1) {
        menuLinks[i].addEventListener('focus', e => {
          closeParentMenu(e);
        });
      }

      // On focus of submenu expand links, close any unrelated submenus.
      for (let i = 0; i < expandBtns.length; i += 1) {
        expandBtns[i].addEventListener('focus', e => {
          closeParentMenu(e);
        });
      }

      // On focus of search (right after menu), close all submenus.
      searchBtn.addEventListener('focus', () => {
        closeCurrentMenus();
        closeOpenMenus();
      });
    }
  },
};

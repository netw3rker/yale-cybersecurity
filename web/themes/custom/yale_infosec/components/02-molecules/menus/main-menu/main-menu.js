Drupal.behaviors.mainMenu = {
  attach(context) {
    const toggleExpand = context.getElementById('toggle-expand');
    const menu = context.getElementById('main-nav');
    const header = context.getElementById('site-header');
    const searchBtn = context.getElementById("search-btn");
    const closeSearch = context.getElementById('search-close');

    const tabbable = `
      a, button, input, select, textarea, svg, area, details, summary,
      iframe, object, embed, 
      [tabindex], [contenteditable]
    `;

    const trapFocus = (focusNode, rootNode = document) => {
      const nodes = [...rootNode.querySelectorAll(tabbable)]
        .filter(node => !focusNode.contains(node) && node.getAttribute('tabindex') !== '-1');
      nodes.forEach(node => node.setAttribute('tabindex', '-1'));
      return {
        release() {
          nodes.forEach(node => node.removeAttribute('tabindex'));
        },
      };
    };

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
      const menuLinks = menu.getElementsByClassName('main-menu__link');

      const currentSubClass = 'main-menu__child-menu--sub-current';
      const openSubClass = 'main-menu__child-menu--sub-open';

      const closeCurrentMenus = () => {
        const currentMenus = document.getElementsByClassName(currentSubClass);

        currentMenus.forEach(menu => {
          menu.classList.remove(currentSubClass);
        });
      }

      const closeOpenMenus = () => {
        const openMenus = document.getElementsByClassName(openSubClass);

        openMenus.forEach(menu => {
          menu.classList.remove(openSubClass);
        })
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
      expandBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          const menuItem = e.currentTarget;
          const subMenu = menuItem.nextElementSibling;
          const backLink = subMenu.firstElementChild.firstElementChild;
          
          closeCurrentMenus();

          subMenu.classList.toggle(openSubClass);
          subMenu.classList.toggle(currentSubClass);

          if (!e.currentTarget.classList.contains('expand-sub--top')) {
            backLink.focus();
            const focusTrap = trapFocus(subMenu);
            backLink.addEventListener('click', e => {
              focusTrap.release();
            });
          }

          backLink.addEventListener('click', e => {
            const backLink = e.currentTarget;
            const parent = backLink.parentNode;
            const parentMenu = parent.parentNode;
            const prevParentMenu = parentMenu.parentNode.parentNode.parentNode;
  
            parent.classList.remove(currentSubClass);
            parentMenu.classList.remove(openSubClass);
            parentMenu.classList.remove(currentSubClass);
            prevParentMenu.classList.add(currentSubClass);
            parentMenu.previousElementSibling.focus();
          });
        });
      });

      // Search button
      searchBtn.addEventListener('click', e => {
        const searchForm = e.currentTarget.nextElementSibling;
        const search = searchForm.querySelectorAll('.form-text');

        searchForm.classList.add('main-nav-search--open');
        search.forEach(item => {
          item.focus();
        });
        searchForm.tabIndex = 0;
        searchForm.setAttribute('aria-modal', true);
        const focusTrap = trapFocus(searchForm);

        // Close Search.
        closeSearch.addEventListener('click', () => {
          const mainNav = context.getElementsByClassName('main-nav-search--open');

          mainNav.forEach(nav => {
            nav.classList.remove('main-nav-search--open')
          });

          focusTrap.release();
          searchBtn.focus();
        });
      });

      // On focus of menu links, close any unrelated submenus.
      menuLinks.forEach(link => {
        link.addEventListener('focus', e => {
          closeParentMenu(e);
        });
      });

      // On focus of submenu expand links, close any unrelated submenus.
      expandBtns.forEach(btn => {
        btn.addEventListener('focus', e => {
          closeParentMenu(e);
        });
      });

      // On focus of search (right after menu), close all submenus.
      searchBtn.addEventListener('focus', () => {
        closeCurrentMenus();
        closeOpenMenus();
      });
    }
  },
};

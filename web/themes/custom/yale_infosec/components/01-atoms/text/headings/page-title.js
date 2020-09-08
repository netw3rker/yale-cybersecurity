Drupal.behaviors.pageTitle = {
  attach(context) {
    const pageTitle = context.querySelector('.page-title');
    const lengthThreshold = 85;
    if (pageTitle.textContent.length > lengthThreshold) {
      pageTitle.classList.add('page-title--long');
    }
  },
};

Drupal.behaviors.mssOverviewOfRequirements = {
  attach(context) {
    const mssOverview = context.querySelector(".mss-overview-content");
    const mssOverviewExpandButton = context.querySelector(
      ".mss-overview-expand-button"
    );

    if (mssOverviewExpandButton) {
      const handleExpansion = () => {
        mssOverview.classList.remove("mss-overview-content--truncated");
        mssOverviewExpandButton.classList.remove(
          "mss-overview-expand-button--visible"
        );
      };

      if (mssOverview && mssOverview.clientHeight > 400) {
        mssOverview.classList.add("mss-overview-content--truncated");
        mssOverviewExpandButton.classList.add(
          "mss-overview-expand-button--visible"
        );
      }

      mssOverviewExpandButton.addEventListener("click", handleExpansion);
    }

    // Business rule: don't allow risk selection if obligations are given.
    const $obligations = jQuery('#edit-obligations');
    const $riskInputs = jQuery('#edit-risk label:not(:contains(High Risk))').prevAll('input');
    $obligations.find('input').on('change', () => {
      if ($obligations.find('input:checked').length) {
        $riskInputs
          .prop('disabled', true)
          .prop('checked', false)
          .nextAll('label')
          .attr('title', 'If HIPAA or PCI obligations are selected, risk level is always high.')
      }
      else {
        $riskInputs
          .prop('disabled', false)
          .nextAll('label')
          .attr('title', '');

      }
    }).change();
  },
};

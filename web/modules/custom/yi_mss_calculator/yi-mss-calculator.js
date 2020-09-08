Drupal.behaviors.mssOverviewOfRequirements = {
  attach(context) {
    const mssOverview = context.querySelector(".mss-overview-content");
    const mssOverviewExpandButton = context.querySelector(
      ".mss-overview-expand-button"
    );

    const handleExpansion = () => {
      mssOverview.classList.remove("mss-overview-content--truncated");
      mssOverviewExpandButton.classList.remove(
        "mss-overview-expand-button--visible"
      );
    };

    if (mssOverview.clientHeight > 400) {
      mssOverview.classList.add("mss-overview-content--truncated");
      mssOverviewExpandButton.classList.add(
        "mss-overview-expand-button--visible"
      );
    }

    mssOverviewExpandButton.addEventListener("click", handleExpansion);
  },
};

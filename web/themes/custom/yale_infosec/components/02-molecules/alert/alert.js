Drupal.behaviors.alert = {
  attach() {
    const alerts = document.getElementsByClassName("alert");
    const alertBtns = document.getElementsByClassName("alert__close");
    const alertCtas = document.getElementsByClassName("alert__button");
    const alertClosed = 'alert--closed';

    // Close alert on click.
    alertBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const alert = e.target.parentNode.parentNode.parentNode;
        const alertId = alert.getAttribute("data-id");
        alert.classList.add(alertClosed);
        // eslint-disable-next-line no-undef
        Cookies.set(alertId, "closed", { expires: 30 });
      });
    });

    // Clicking the More Information button.
    alertCtas.forEach(cta => {
      cta.addEventListener("click", (e) => {
        const alert = e.target.parentNode.parentNode;
        const alertId = alert.getAttribute("data-id");
        alert.classList.add(alertClosed);
        // eslint-disable-next-line no-undef
        Cookies.set(alertId, "closed", { expires: 30 });
      });
    });

    // If cookie exists, close alert.
    // eslint-disable-next-line no-undef
    alerts.forEach(alert => {
      const alertId = alert.getAttribute("data-id");
      if (Cookies.get(alertId) === "closed") {
        alert.classList.add(alertClosed);
      }
    });
  },
};

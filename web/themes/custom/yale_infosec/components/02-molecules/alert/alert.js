Drupal.behaviors.alert = {
  attach() {
    const alerts = document.getElementsByClassName("alert");
    const alertBtns = document.getElementsByClassName("alert__close");
    const alertCtas = document.getElementsByClassName("alert__button");
    const alertClosed = 'alert--closed';

    // Close alert on click.
    for (let i = 0; i < alertBtns.length; i += 1) {
      alertBtns[i].addEventListener("click", (e) => {
        const alert = e.target.parentNode.parentNode.parentNode;
        const alertId = alert.getAttribute("data-id");
        alert.classList.add(alertClosed);
        // eslint-disable-next-line no-undef
        Cookies.set(alertId, "closed", { expires: 30 });
      });
    }

    // Clicking the More Information button.
    for (let i = 0; i < alertCtas.length; i += 1) {
      alertCtas[i].addEventListener("click", (e) => {
        const alert = e.target.parentNode.parentNode;
        const alertId = alert.getAttribute("data-id");
        alert.classList.add(alertClosed);
        // eslint-disable-next-line no-undef
        Cookies.set(alertId, "closed", { expires: 30 });
      });
    }

    // If cookie exists, close alert.
    // eslint-disable-next-line no-undef
    for (let i = 0; i < alerts.length; i += 1) {
      const alertId = alerts[i].getAttribute("data-id");
      if (Cookies.get(alertId) === "closed") {
        alerts[i].classList.add(alertClosed);
      }
    }
  },
};

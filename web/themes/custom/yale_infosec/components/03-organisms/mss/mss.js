Drupal.behaviors.mssDisplay = {
  attach(context) {
    const devices = context.querySelectorAll('.specifications__device');
    const risks = context.querySelectorAll('.specifications__risk');

    const getWidest = value => {
      let width = 0;
      value.forEach(item => {
        if (item.clientWidth > width) {
          width = item.clientWidth;
        }
      });
      return width + 20;
    };

    const deviceWidest = getWidest(devices);
    const riskWidest = getWidest(risks);

    devices.forEach(item => (item.style.width = `${deviceWidest}px`));
    risks.forEach(item => (item.style.width = `${riskWidest}px`));
  },
};

 // Can detect if class is split.
  var half = 'button-';
  $(button).addClass(half + 'active');

 $(button).addClass('unusual-JS(class)');

  // Can detect if class is joined.
  var dynamicClass = ['button', 'active'].join('-');
  $(button).addClass(dynamicClass);

  // Can detect various more ways, including all Javascript frameworks.
  // A React example.
  var classes = classNames({
    'button-react': this.state.buttonActive
  });

  return (
    <button className={classes}>Submit</button>;
  );

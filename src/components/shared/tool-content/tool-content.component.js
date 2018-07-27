import React from 'react';

const ToolContentComponent = ({ children, menuFocus }) => (
  <section className={`content ${menuFocus ? 'focus' : ''}`}>
    { children }
  </section>
);

export default ToolContentComponent;

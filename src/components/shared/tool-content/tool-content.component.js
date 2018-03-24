import React from 'react';

const ToolContentComponent = ({ children, menu_focus }) => (
  <section className={`content ${menu_focus ? 'focus' : ''}`}>
    { children }
  </section>
);

export default ToolContentComponent;

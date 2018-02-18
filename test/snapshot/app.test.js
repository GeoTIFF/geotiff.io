import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../src/components/app';

Enzyme.configure({ adapter: new Adapter() });

test('Snapshot: App', () => {
  const component = Enzyme.shallow(<App />);
  expect(component).toMatchSnapshot();
});

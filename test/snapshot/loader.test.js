import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from '../../src/components/loader';

Enzyme.configure({ adapter: new Adapter() });

test('Snapshot: Loader', () => {
  const component = Enzyme.shallow(<Loader />);
  expect(component).toMatchSnapshot();
});

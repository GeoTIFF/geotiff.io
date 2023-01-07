import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MeanComponent from './mean.component';
import { withProps } from 'recompose';

const  calculateMean = async (raster, coors) => {
  // FIXME: 非同期処理を完了まで待ってからretrunで結果を返したい
  const result = await geoblaze.mean(raster, coors)
  console.log(result);
  return result.map(value => value.toFixed(2)).join(', ');
  
}

const MeanContainer = withProps(
  { func: calculateMean }
)(BaseStats(MeanComponent));

export default MeanContainer;

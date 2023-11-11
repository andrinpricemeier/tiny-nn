import { ReluActivation } from './../src/ReluActivation';
import { DenseLayer } from './../src/DenseLayer';

describe('dense layer', () => {
  it('works', () => {
    const weights = [
      [0.5, 0.3, 0.1],
      [0.2, 0.8, 0.4],
    ];
    const biases = [3, 4, 5];
    const relu = new ReluActivation();
    const units = 3;
    const dense = new DenseLayer(units, weights, biases, relu);
    const values = [0.32, 0.45];
    expect(dense.feedForward(values)).toEqual([3.25, 4.456, 5.212]);
  });
});

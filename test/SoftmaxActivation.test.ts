import { SoftmaxActivation } from '../src';

describe('softmax activation', () => {
  it('output values are correct', () => {
    const values = [0, 9, 4];
    const expected = [
      0.00012256881570915678,
      0.9931854005948174,
      0.006692030589473348,
    ];
    const softmax = new SoftmaxActivation();
    expect(softmax.transform(values)).toEqual(expected);
  });

  it('output values sum to 1', () => {
    const values = [0, 9, 4];
    const softmax = new SoftmaxActivation();
    const output = softmax.transform(values);
    const total = output.reduce(
      (state: number, current: number) => state + current
    );
    expect(total).toBeCloseTo(1.0, 10);
  });
});

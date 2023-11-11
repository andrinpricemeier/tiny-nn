import { ReluActivation } from '../src';

describe('relu activation', () => {
  it('works', () => {
    const values = [-323, -4, 0, 4123123, 323];
    const expected = [0, 0, 0, 4123123, 323];
    const relu = new ReluActivation();
    expect(relu.transform(values)).toEqual(expected);
  });
});

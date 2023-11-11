import { IActivation } from './IActivation';

export class SoftmaxActivation implements IActivation {
  transform(values: number[]): number[] {
    const activated: number[] = [];
    const exped = values.map(val => Math.exp(val));
    const total_exp = exped.reduce(
      (state: number, current: number) => state + current
    );
    for (const value of values) {
      const logit_exp = Math.exp(value);
      const output = logit_exp / total_exp;
      activated.push(output);
    }
    return activated;
  }
}

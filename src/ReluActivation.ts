import { IActivation } from './IActivation';

export class ReluActivation implements IActivation {
  transform(values: number[]): number[] {
    const activated: number[] = [];
    for (const value of values) {
      const output = Math.max(0, value);
      activated.push(output);
    }
    return activated;
  }
}

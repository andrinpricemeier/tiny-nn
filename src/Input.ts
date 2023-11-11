import { INormalization } from './INormalization';

export class Input {
  constructor(private readonly normalization: INormalization) {}

  transform(values: number[]): number[] {
    return this.normalization.transform(values);
  }
}

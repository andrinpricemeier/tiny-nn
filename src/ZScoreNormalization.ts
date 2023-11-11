import { INormalization } from './INormalization';

export class ZScoreNormalization implements INormalization {
  constructor(
    private readonly mus: number[],
    private readonly sigmas: number[]
  ) {}

  transform(values: number[]): number[] {
    const normalized: number[] = [];
    for (let param_index = 0; param_index < values.length; param_index++) {
      const value = values[param_index];
      const mu = this.mus[param_index];
      const sigma = this.sigmas[param_index];
      const output = (value - mu) / sigma;
      normalized.push(output);
    }
    return normalized;
  }
}

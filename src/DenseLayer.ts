import { ILayer } from './ILayer';
import { IActivation } from './IActivation';
import invariant from 'tiny-invariant';

type Matrix = MatrixRow[];
type MatrixRow = number[];

export class DenseLayer implements ILayer {
  constructor(
    private readonly units: number,
    private readonly weights: Matrix,
    private readonly biases: number[],
    private readonly activation: IActivation
  ) {}

  feedForward(inputs: number[]): number[] {
    invariant(
      this.units === this.weights[0].length,
      'weights mismatch: number of columns in weight matrix must be equal to number of output units'
    );
    invariant(
      inputs.length === this.weights.length,
      'weights mismatch: number of rows in weight matrix must be equal to number of input values'
    );
    invariant(
      this.units === this.biases.length,
      'biases mismatch: number of biases must be equal to number of output units'
    );
    let neuronIndex = 0;
    const allZ: number[] = [];
    for (let unitIndex = 0; unitIndex < this.units; unitIndex++) {
      let weightIndex = 0;
      let totalWeights = 0;
      for (const sourceNeuronValue of inputs) {
        const weight = this.weights[weightIndex][neuronIndex];
        totalWeights += weight * sourceNeuronValue;
        weightIndex++;
      }
      const z = totalWeights + this.biases[neuronIndex];
      allZ.push(z);
      neuronIndex++;
    }
    const activated = this.activation.transform(allZ);
    invariant(
      activated.length === this.units,
      'output neurons mismatch: number of output values must be equal to number of specified units'
    );
    return activated;
  }
}

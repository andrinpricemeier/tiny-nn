import { ILayer } from './ILayer';
import { Input } from './Input';
import invariant from 'tiny-invariant';

export class NeuralNetwork {
  private input?: Input;
  private readonly layers: ILayer[] = [];

  setInput(input: Input): void {
    this.input = input;
  }

  addLayer(layer: ILayer): void {
    this.layers.push(layer);
  }

  feedForward(x: number[]): number[] {
    invariant(
      this.input !== undefined && this.input !== null,
      'input must be defined before feed forwarding.'
    );
    let state: number[] = this.input?.transform(x);
    for (const layer of this.layers) {
      state = layer.feedForward(state);
    }
    return state;
  }
}

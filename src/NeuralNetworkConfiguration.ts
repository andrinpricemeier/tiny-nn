import { DenseLayer } from './DenseLayer';
import { Input } from './Input';
import { NeuralNetwork } from './NeuralNetwork';
import { ReluActivation } from './ReluActivation';
import { SoftmaxActivation } from './SoftmaxActivation';
import { ZScoreNormalization } from './ZScoreNormalization';

export class NeuralNetworkConfiguration {
  loadFromJSONString(jsonString: string): NeuralNetwork {
    const parsedConfig = JSON.parse(jsonString);
    const nn = new NeuralNetwork();
    const inputs = new Input(
      new ZScoreNormalization(
        parsedConfig['input']['normalization']['mus'],
        parsedConfig['input']['normalization']['sigmas']
      )
    );
    nn.setInput(inputs);
    for (let layerConfig of parsedConfig['layers']) {
      let activationFunc;
      if (layerConfig['activation'] === 'relu') {
        activationFunc = new ReluActivation();
      } else {
        activationFunc = new SoftmaxActivation();
      }
      const denseLayer = new DenseLayer(
        layerConfig['units'],
        layerConfig['weights'],
        layerConfig['biases'],
        activationFunc
      );
      nn.addLayer(denseLayer);
    }
    return nn;
  }
}

import { NeuralNetworkConfiguration } from './../src/NeuralNetworkConfiguration';
const fs = require('fs');
const path = require('path');

describe('neural network', () => {
  it('works', () => {
    const file = path.join(
      __dirname,
      './example_config_files',
      'tiny_nn_example_config.json'
    );
    const jsonString = fs.readFileSync(file, 'utf8', function(
      _: any,
      data: any
    ) {
      return data;
    });
    const config = new NeuralNetworkConfiguration();
    const nn = config.loadFromJSONString(jsonString);
    const x = [0.5, 0.5, -0.9396926164627075, -0.3420201539993286, 0.5, 0.5];
    const output = nn.feedForward(x);
    const expected = [
      0.012167297976847055,
      0.7346085954192233,
      0.2532241066039296,
    ];
    for (let i = 0; i < output.length; i++) {
      expect(output[i]).toBeCloseTo(expected[i], 6);
    }
  });
});

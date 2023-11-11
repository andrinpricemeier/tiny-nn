import { Input, ZScoreNormalization } from '../src';
import { NeuralNetwork } from './../src/NeuralNetwork';
import { DenseLayer } from './../src/DenseLayer';
import { ReluActivation } from './../src/ReluActivation';
import { SoftmaxActivation } from './../src/SoftmaxActivation';

describe('neural network', () => {
  it('works', () => {
    const mus = [
      0.33337702376600264,
      0.5153563783685589,
      -0.7617037799827295,
      0.012912516517485205,
      0.5022215660378972,
      0.5022215660378972,
    ];
    const sigmas = [
      0.20643863564542597,
      0.2690903048652044,
      0.17020660475885124,
      0.6250362669552798,
      0.22680095198489916,
      0.22680095198489916,
    ];
    const nn = new NeuralNetwork();
    const inputLayer = new Input(new ZScoreNormalization(mus, sigmas));
    nn.setInput(inputLayer);
    const weights1 = [
      [
        1.5399314165115356,
        -2.8293917179107666,
        2.5251340866088867,
        -2.188577651977539,
      ],
      [
        -0.42994531989097595,
        1.8620425462722778,
        0.1342128962278366,
        -1.956148624420166,
      ],
      [
        -1.4407576322555542,
        -1.4305858612060547,
        0.16285541653633118,
        -1.7758865356445312,
      ],
      [
        0.932239830493927,
        0.28353357315063477,
        0.09982147812843323,
        -0.1016136035323143,
      ],
      [
        -0.9442276954650879,
        -0.0217185877263546,
        -0.03981543332338333,
        0.3795953691005707,
      ],
      [
        -0.706321120262146,
        -1.2678898572921753,
        -1.2025315761566162,
        1.0569857358932495,
      ],
    ];
    const biases1 = [
      0.18150554597377777,
      -0.6440380215644836,
      0.0957767590880394,
      -0.6265329122543335,
    ];
    const dense1 = new DenseLayer(4, weights1, biases1, new ReluActivation());
    nn.addLayer(dense1);
    const weights2 = [
      [-2.110299825668335, -0.4672742784023285, 2.0454554557800293],
      [-5.953957557678223, -0.011198162101209164, 3.4104886054992676],
      [0.8358049988746643, 1.6214172840118408, -1.3059618473052979],
      [4.184386253356934, 0.36222976446151733, -7.352657794952393],
    ];
    const biases2 = [
      1.4740967750549316,
      0.06014930456876755,
      -1.546537160873413,
    ];
    const dense2 = new DenseLayer(
      3,
      weights2,
      biases2,
      new SoftmaxActivation()
    );
    nn.addLayer(dense2);
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

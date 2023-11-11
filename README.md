<div align="center">
  <h1>Tiny NN</h1>
  <img src="./readme_images/tiny_nn.png" width="200"/>
  <p>Tiny NN is a library for using feed-forward networks without any dependencies.</p>
</div>


[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Introduction

Tiny NN gives you the ability to easily calculate the output of a neural network in the browser without having to install any of the big libraries (such as TensorFlow).
It does not include any training algorithms, such as backpropagation.
Instead, the idea is to train the network separately and use this library with the trained weights for e.g. classification purposes.


# Process

1. Train a network of your choice in the language of your choice
1. Export your trained parameters (see the scripts folder for example scripts)
1. Load a tiny neural network using the parameters in TypeScript
1. Run your classification

# Usage

Most of the time you just want to load a neural network from an exported configuration file. Something like this:

```
const jsonString = loadJsonFileFromSomewhere();
const config = new NeuralNetworkConfiguration();
const nn = config.loadFromJSONString(jsonString);
const x = [0.5, 0.5, -0.9396926164627075, -0.3420201539993286, 0.5, 0.5];
const output = nn.feedForward(x);
```

Here's an example showing you how the most important classes and how they relate to each other:

```
const nn = new NeuralNetwork();
const inputLayer = new Input(new ZScoreNormalization(mus, sigmas));
nn.setInput(inputLayer);
const dense1 = new DenseLayer(4, weights1, biases1, new ReluActivation());
nn.addLayer(dense1);
const dense2 = new DenseLayer(3, weights2, biases2, new SoftmaxActivation());
nn.addLayer(dense2);
const x = [0.5, 0.5, -0.9396926164627075, -0.3420201539993286, 0.5, 0.5];
const output = nn.feedForward(x);
```

With this you can now build your own domain specific abstractions.
This example shows a simple classifier that predicts the action an AI controlled paddle should take.
The inputs could be x and y coordinates of the opponent's paddle. The output would be one of the provided class names.
The constructor also accepts a neural network, loaded using the configuration class from a JSON file.

```
export class PongActionClassifier() {
  constructor(private readonly nn: NeuralNetwork, private readonly classNames: string[]) {}

  classify(inputs: number[]): string {
    const outputs = this.nn.feedForward(inputs);
    const maxIndex = ...;
    return this.classNames[maxIndex];
  }
}
```

# Neural Network Configuration

Check out the example_config folder for examples of a configuration file.

# How to export parameters

Check out the export_scripts folder for example scripts on how to export your weights of a TensorFlow/Keras trained neural network.
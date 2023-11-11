import json

def z_score_to_config(mus, sigmas):
    return { "type": "z_score", "mus": mus, "sigmas": sigmas }

def layer_to_config(units, weights, biases, activation):
    return { "units": units, "weights": weights, "biases": biases , "activation": activation}

# scaler is a StandardScaler, fitted on training data.
z_score_parameters = z_score_to_config(scaler.mean_.tolist(), scaler.scale_.tolist())

# classifier in this case is a fully trained Keras neural network.
# Adjust as needed, depending on the number of layers you have.
layer_1_config = layer_to_config(units=4, weights=classifier.get_weights()[0].tolist(), biases=classifier.get_weights()[1].tolist(), activation="relu")
layer_2_config = layer_to_config(units=3, weights=classifier.get_weights()[2].tolist(), biases=classifier.get_weights()[3].tolist(), activation="softmax")

final_config = {
 "name": "pong_action_classifier",
  "version": "0.1",
  "input": {
          "normalization": z_score_parameters
  },
  "layers": [
      layer_1_config,
      layer_2_config
  ]
}
json_config = json.dumps(final_config)
output_file_path = 'pong_action_classifier_tiny_nn.json'
with open(output_file_path, 'w', encoding='utf-8') as f:
    json.dump(json_config, f, ensure_ascii=False, indent=4)
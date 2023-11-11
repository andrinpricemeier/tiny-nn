import { ZScoreNormalization } from '../src';

describe('z-score normalization', () => {
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
    const unnormalized = [
      0.5,
      0.5,
      -0.9396926164627075,
      -0.3420201539993286,
      0.5,
      0.5,
    ];
    const expected = [
      0.8071307762379566,
      -0.05706775045742111,
      -1.0457222663724044,
      -0.5678593215811085,
      -0.009795223602258799,
      -0.009795223602258799,
    ];
    const zscore = new ZScoreNormalization(mus, sigmas);
    const normalized = zscore.transform(unnormalized);
    expect(normalized).toEqual(expected);
  });
});

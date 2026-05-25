const sm2 = (q, n, EF, I) => {

  if (q >= 3) {
    if (n == 0) {
      I = 1;
    } else if (n == 1) {
      I = 6;
    } else {
      I = Math.round(I * EF);
    }
    n = n+1;
  } else {
    n = 0;
    I = 1;
  }

  EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  if (EF < 1.3) {
    EF = 1.3;
  }

  const output = {
    repetitions: n,
    easyFactor: EF,
    interval: I
  }
  return output;

}

export default sm2;

import almostEqual from 'almost-equal';
import fixedMath from 'fixed-math';

expect.extend({
  toBeAlmostEqual(received: number[]) {
    let pass = true;
    for (let i = 0; i < received.length && pass; ++i) {
      const current = received[i];
      const expected = fixedMath(current, 5);
      pass = almostEqual(current, expected, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON);
    }

    if (pass) {
      return {
        message: () => '',
        pass,
      };
    } else {
      return {
        message: () => 'Error with almost equal',
        pass,
      };
    }
  },
});

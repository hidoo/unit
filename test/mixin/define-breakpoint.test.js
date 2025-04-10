import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../util/index.js';

/**
 * wrapper
 *
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (settings = []) => `
${useSettingsWith(settings)}
@use "sass:meta";
@use "src/lib/mixin";

.selector {
  content: meta.mixin-exists("define-breakpoint", "mixin");
}
`;

describe('[DEPRECATED] @mixin define-breakpoint($from, $until, $options)', () => {
  it('should exists.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector{content:true}'
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      }
    );
  });
});

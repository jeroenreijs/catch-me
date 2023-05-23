import { setRandomStyle } from '../../utils/randomStyle';

test('Do I get a randomstyle', () => {
  const randomStyle = setRandomStyle();
  const styles = ['level-alt0', 'level-alt1', 'level-alt2', 'level-alt3'];
  expect(styles).toContain(randomStyle);
});

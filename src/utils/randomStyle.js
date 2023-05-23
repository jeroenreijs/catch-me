export const setRandomStyle = () => {
  const randomStyle = `level-alt${Math.floor(Math.random() * 4)}`;
  document.body.classList.remove(
    'level-alt0',
    'level-alt1',
    'level-alt2',
    'level-alt3'
  );
  document.body.classList.add(randomStyle);
  return randomStyle;
};

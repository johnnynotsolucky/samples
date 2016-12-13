// eslint-disable-next-line no-mixed-operators
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default (size, min, max) => {
  const data = [];
  for (let i = 0; i < size; i++) {
    const num = rand(min, max);
    data.push(num);
  }
  return data;
};

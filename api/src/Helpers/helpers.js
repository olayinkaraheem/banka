export const recordExists = (model, data, key) => {
  const check = model.filter(resource => {
    return resource[key] === data[key];
  });
  return check.length ? true : false;
};

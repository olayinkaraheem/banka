/**
 * Checks if a record already exists
 * @param {object} model
 * @param {object} data
 * @param {string} key
 * @returns {boolean}
 */
export const recordExists = (model, data, key) => {
  const check = model.filter(resource => {
    return resource[key] === data[key];
  });
  return check.length ? true : false;
};

/**
 * Get the last ID from a list of resources
 * @param {object} model
 * @returns {number}
 */
export const getLastId = model => {
  const ids = model.map(item => {
    return item.id;
  });
  return Math.max(...ids);
};

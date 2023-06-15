/**
 * @function paginate Return the Paginated result using pageNumber and pageSize
 * @param {Array} array Array of Elements
 * @param {Number} pageNumber Page number to be returned
 * @param {Number} pageSize Page size of the result
 */
exports.paginate = function (array, pageNumber, pageSize) {

  const data = array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize); 
  return {
    data,
    page: pageNumber,
    limit: pageSize,
    totalCount: array.length, 
    totalPages: Math.ceil(array.length / pageSize)
  } 
};


const getListVehicles = asyncHandler(async (req, res) => {
  const pathSegments = req.params[0].split('/');
  const filters = {};
  const options = {
    sort: {},
  };

  let page = 1;

  let makes = [];
  let models = [];
  let variants = [];
  let bodyTypes = [];

  pathSegments.forEach((segment) => {
    // ...existing code...
  });

  if (makes.length > 0) {
    filters.make = { $in: makes.map((make) => new RegExp(`${make.trim()}`, 'i')) };
  }

  if (models.length > 0) {
    filters.model = { $in: models.map((model) => new RegExp(`${model.trim()}`, 'i')) };
  }

  if (variants.length > 0) {
    filters.variant = { $in: variants.map((variant) => new RegExp(`${variant.trim()}`, 'i')) };
  }

  if (bodyTypes.length > 0) {
    filters.bodyType = {
      $in: bodyTypes.map((bodyType) => new RegExp(`${bodyType.trim()}`, 'i')),
    };
  }

  const [totalVehicles, vehicles] = await Promise.all([
    NewVehicle.countDocuments(filters),
    NewVehicle.find(filters, null, options).lean(),
  ]);

  // ...existing code...
});

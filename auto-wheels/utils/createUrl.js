export const buildNewVehicleUrl=(basePath, segments = [])=> {
    if (!basePath) {
      throw new Error("Base path is required");
    }
    const url = [basePath, ...segments].join('/');
  
    return url;
  }
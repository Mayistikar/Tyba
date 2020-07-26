export const validation = (validations, req) => {
  try {
    validations.forEach(validation => {
      validation.schemas.forEach(schema => {
          const result = schema.validate(req[validation.property]);
          if (result.error) throw new Error( result.error );
      });
    });
    return { error: false, message: 'All is fine!' }
  } catch (error) {
    console.error('UTILS_validation:', error.message);
    return { error: true, message: error.message };
  }
};

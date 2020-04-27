export function parseOpenApiResponse(params: any) {
    const { options: { paths }, url } = params;

    try {
      const parameters: any[] = [];
      const requestUrl = Object.keys(paths)[0];
      const verbs = Object.keys(paths[`${requestUrl}`]);
      const pathValues: any = Object.values(paths)[0];

      verbs.forEach((verb: string) => {
        parameters.push({
          verb,
          values: getVerbParameterValues(pathValues[`${verb}`])
        });
      });

      return { url, parameters };
    } catch (error) {
      return { error };
    }
  }

  function getVerbParameterValues(values: any) {
    const parameterValues: any[] = [];
      const queryParameters = values.parameters;
      if (queryParameters.length > 0) {
        queryParameters.forEach((parameter: any) => {
          if (parameter.name) {
            parameterValues.push({
              name: parameter.name,
              items: (parameter.items && parameter.items.enum) ? parameter.items.enum : null
            });
          }
        });
      }
    return parameterValues;
  }
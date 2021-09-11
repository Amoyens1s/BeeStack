export const response: any = {
  json: (body?: any) => {
    return body;
  },
  status: () => response,
};

import { useQuery } from "@tanstack/react-query";

import { getDoa } from "../query";

const useQueryUsers = (skip, options) => {
  return useQuery([`get-doa`, { skip }], () => getDoa(skip), {
    ...options,
  });
};

export { useQueryUsers };
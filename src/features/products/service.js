import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../query";

const useQueryUsers = (skip, options) => {
  return useQuery([`get-user`, { skip }], () => getUsers(skip), {
    ...options,
  });
};

export { useQueryUsers };

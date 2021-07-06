import { INode } from '../types/nodes';

export const formatInfiniteNodes = <T extends INode>(
  inputNodes: T[],
  cursor: number,
  limit: number
) => {
  let nodes: T[];
  nodes = inputNodes
    .sort((a, b) => b.createdAt - a.createdAt)
    // if cursor exists return only nodes that were created before cursor, otherwise return all nodes
    .filter((node) => (cursor > 0 ? node.createdAt < cursor : node))
    .slice(0, limit);

  const nextCursor = nodes[nodes.length - 1]?.createdAt;
  return {
    outputNodes: nodes,
    nextCursor,
  };
};

type Cursor = number;

export const fetchAllIngredients = async ({
  pageParam,
}: {
  pageParam?: Cursor;
}) => {
  const response = await fetch(`/api/search-ingredients?cursor=${pageParam}`, {
    method: 'GET',
    credentials: 'same-origin',
  });

  return await response.json();
};

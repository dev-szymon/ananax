export interface INode {
  id: string;
  name: string;
  type: 'ingredient' | 'user' | 'recipe';
  createdAt: number;
}

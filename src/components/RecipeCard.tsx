import styled from 'styled-components';
import { BorderBottom } from './styles';

const RecipeDataStyles = styled.div``;

interface Props {
  name: string;
}
export default function RecipeCard({ name }: Props) {
  return (
    <BorderBottom>
      <RecipeDataStyles>
        <h2>{name}</h2>
      </RecipeDataStyles>
    </BorderBottom>
  );
}

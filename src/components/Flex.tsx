import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface IFlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: 'flex-end' | 'flex-start' | 'center';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between';
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
}

export const FlexStyles = styled.div`
  display: flex;
`;

export default function Flex({
  children,
  align,
  justify,
  direction,
  style,
  ...rest
}: IFlexProps) {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

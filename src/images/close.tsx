interface Props {
  fill: string;
}

export const Close = ({ fill }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 13.4142L8.70718 16.7071L7.29297 15.2929L10.5859 12L7.29297 8.70711L8.70718 7.29289L12.0001 10.5858L15.293 7.29289L16.7072 8.70711L13.4143 12L16.7072 15.2929L15.293 16.7071L12.0001 13.4142Z"
        fill={fill}
      />
    </svg>
  );
};
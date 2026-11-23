const PrevButtonIcon = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.49975 7.64075L3.91427 5.05527C3.52374 4.66474 2.96972 4.5856 2.67683 4.87849C2.38394 5.17138 2.46308 5.7254 2.85361 6.11593L5.68203 8.94435C5.92532 9.18764 6.23207 9.31009 6.4996 9.29701C6.7672 9.31019 7.07408 9.18775 7.31746 8.94437L10.1459 6.11594C10.5364 5.72542 10.6156 5.1714 10.3227 4.8785C10.0298 4.58561 9.47575 4.66476 9.08523 5.05528L6.49975 7.64075Z"
        fill="black"
        fillOpacity={isDisabled ? "0.35" : "0.85"}
      />
    </svg>
  );
};

export default PrevButtonIcon;

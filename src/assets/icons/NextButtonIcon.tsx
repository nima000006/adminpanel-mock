const NextButtonIcon = ({ isDisabled = false }: { isDisabled?: boolean }) => {
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
        d="M6.49975 6.35925L3.91427 8.94473C3.52374 9.33526 2.96972 9.4144 2.67683 9.12151C2.38394 8.82862 2.46308 8.2746 2.85361 7.88407L5.68203 5.05565C5.92532 4.81236 6.23207 4.68991 6.4996 4.70299C6.7672 4.68981 7.07408 4.81225 7.31746 5.05563L10.1459 7.88406C10.5364 8.27458 10.6156 8.8286 10.3227 9.1215C10.0298 9.41439 9.47575 9.33524 9.08523 8.94472L6.49975 6.35925Z"
        fill="black"
        fillOpacity={isDisabled ? "0.35" : "0.85"}
      />
    </svg>
  );
};

export default NextButtonIcon;

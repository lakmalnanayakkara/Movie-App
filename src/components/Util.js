const roundNumber = (number) => {
  const firstRoundedNumber = Math.round(number * 10) / 10;
  const integer_part = Math.floor(number);
  if (firstRoundedNumber <= integer_part + 0.2) {
    return integer_part;
  } else if (
    integer_part + 0.2 < firstRoundedNumber &&
    firstRoundedNumber <= integer_part + 0.6
  ) {
    return integer_part + 0.5;
  } else {
    return integer_part + 1;
  }
};

export default roundNumber;

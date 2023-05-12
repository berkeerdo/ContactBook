import PropTypes from "prop-types";

const TextError = (children: any) => {
  return <div style={{ color: "red" }}>{children}</div>;
};

TextError.propTypes = {
  children: PropTypes.node,
};

export default TextError;

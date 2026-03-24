import PropTypes from "prop-types";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
};
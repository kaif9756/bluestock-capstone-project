import PropTypes from "prop-types";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg ${className}`}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string
};
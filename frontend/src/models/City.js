import PropTypes from 'prop-types';

/**
 * @typedef {Object} Profile
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} [age]
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {Profile} profile
 * @property {string[]} roles
 */

export const UserPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    lat: PropTypes.number,
    lon: PropTypes.number,
    //   profile: PropTypes.shape({
    //     firstName: PropTypes.string.isRequired,
    //     lastName: PropTypes.string.isRequired,
    //     age: PropTypes.number,
    //   }).isRequired,
    //   roles: PropTypes.arrayOf(PropTypes.string).isRequired,
});

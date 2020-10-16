
const organizations = ({ id, name }) => `${id}. ${name}`;

const departments = ({ id, name }) => id ? `${id}. ${name}` : '';

const users = ({ id, login, name }) => `${id}. ${login}` + (name ? ` / ${name}` : '');


export default {
    organizations,
    departments,
    users,
};

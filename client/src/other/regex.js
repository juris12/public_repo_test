const regex = {
    USER:/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
    EMAIL:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    PWD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
}
export default regex
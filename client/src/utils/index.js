export const validateInput = (type,value) => {
    let error;
    switch (type) {
        case 'email': 
            const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            error = value.match(validRegex)
                ? ''
                : 'Not a valid email'
            break
        case 'password': 
            error = value.length > 5 
                ? ''
                : 'Password must be atleast 6 characters'
                break
        default:
            return ''
    }
    return error
}


export const usernameParse = (username: string) => {
    // using regex, replace dots with space and capitalize first letter of each word
    return username.replace(/\./g, ' ').replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

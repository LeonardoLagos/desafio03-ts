const dioBank = {
    status: false,
    userApp: ''
}

const usuario = {
    user: '',
    password: ''
}

export const getAllLocalStorage = (): string | null  => {
    return JSON.stringify({ ...localStorage })
}

export const  QueryLocalStorage = (key:string): string | null => {
    return localStorage.getItem(key)
}

export const createLocalStorage = (): void => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
    localStorage.setItem('usuario', JSON.stringify(usuario))
}

export const changeLocalStorage = (key:string, value:string): void => {
    localStorage.setItem(key, value)
}

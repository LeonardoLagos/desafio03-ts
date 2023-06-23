const conta = {
    email: 'teste@email.com',
    password: '123456',
    name: 'Usuario Temp',
    balance: 2000.00,
    id: '1'
}

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta)
    }, 3000)
})

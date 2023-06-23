import { changeLocalStorage, createLocalStorage, getAllLocalStorage } from "./storage"

const dioBank = {
    status: false,
    userApp: ''
}

const usuario = {
    user: '',
    password: ''
}

describe('storage', () => {
    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem')
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
    it('Deve retornar o objeto no localStorage', () => {
        getAllLocalStorage()
        expect(JSON.stringify({ ...localStorage }));
    })

    it('Deve criar o objeto no localStorage', () => {
        createLocalStorage()
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
        expect(mockSetItem).toHaveBeenCalledWith('usuario', JSON.stringify(usuario))
    })

    it('Deve alterar o valor do objeto no localStorage', () => {
        changeLocalStorage('diobank',JSON.stringify(dioBank))
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
    })
})
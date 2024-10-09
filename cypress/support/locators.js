const locators = {

    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'

    },

    HOME:{
        BALANCE_ACCOUNT: 'tbody > :nth-child(3) > :nth-child(1)',
        BALANCE_VALUE: ':nth-child(3) > :nth-child(2)'

    },

    MENU: {
        BTN_HOME: '[data-test="menu-home"]',
        BTN_SETTINGS: '[data-test="menu-settings"]',
        BTN_ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        BALANCE: '[data-test="menu-extrato"] > .fas',
        CASHFLOW: '[data-test="menu-movimentacao"]'

    },

    ACCOUNT: {
        NAME: '[data-test="nome"]',
        BTN_SAVE: '.btn',
        ALTER_ACCOUNT: 'tbody > :nth-child(1) > :nth-child(2) > :nth-child(1)'

    },
    CASHFLOW: {
        DESCRIPTION: '[data-test="descricao"]',
        VALUE: '[data-test="valor"]',
        PAYEE: '[data-test="envolvido"]',
        ACCOUNTSELECT: '[data-test="conta"]',
        STATUS: '[data-test="status"]',
        BTN_SAVE: '.btn-primary'

    },
    BALANCE: {
        REMOVETRANSACTION: ':nth-child(1) > .row > .col > [href="#"] > .far',
        ALTERTRANSACTIONone: '.receitaPendente > .row > .col .fas',
        BALANCESTATUSLINE: desc => `${desc}`

    },

    STATEMENTS: {
        DESCRIPTION: ':nth-child(7) > .row > .col-12 > :nth-child(1) > span',
        VALUE: ':nth-child(7) > .row > .col-12 > :nth-child(1) > small'


    },
    



    MESSAGE: '.toast-message'



}



export default locators;
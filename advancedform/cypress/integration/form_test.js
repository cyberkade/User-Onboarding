const baseUrl = "http://localhost:3000/"

describe('The Form Page', () => {

    it("Successfully loads", () => {
        cy.visit(baseUrl)
    })

    
})

describe('Fill Out Form', () => {
    it("Fills out the entire form", () => {

        cy.get('#username').type('Heimerdinger')
        cy.get('#email').type('HeimsWeims@gmail.com')
        cy.get('#password').type('SchmoopySnachs')
        cy.get('#genre').select('Indie Rock')
        cy.get('#tos').check()
        cy.get('#submit').click()
    })
})

describe('Look for new user card', () => {
    it('Looks for a new user card with the correct info', () => {
        cy.get('.user h2').contains('Heimerdinger')
        cy.get('.user h3').first().contains('Loves Indie Rock')
        cy.get('.user h3').eq(1).contains('HeimsWeims@gmail.com')
    })
})

describe('Form Validation', () => {
    it('Checks for validation if input is left empty', () => {
        cy.get('#username').type('Heimerdinger')
        cy.get('#password').type('SchmoopySnachs')
        cy.get('#email').type('H{backspace}')
        cy.get('#genre').select('Indie Rock')
        cy.get('#tos').check()
        cy.get('.errorMsg').contains('Must include email address.')
    })
})
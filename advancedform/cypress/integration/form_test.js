const baseUrl = "http://localhost:3000/"

describe('The Form Page', () => {

    it("Successfully loads", () => {
        cy.visit(baseUrl)
    })

    
})

describe('Fill Out Form', () => {
    it("Fill out and check form for correct values", () => {

        cy.get('input[name=username]').should('have.value', '').type('Heimerdinger').should('have.value', 'Heimerdinger')
        cy.get('input[name=email]').should('have.value', '').type('HeimsWeims@gmail.com').should('have.value', 'HeimsWeims@gmail.com')
        cy.get('input[name=password]').should('have.value', '').type('SchmoopySnachs').should('have.value', 'SchmoopySnachs')
        cy.get('select[name=genre]').should('have.value', '--select a genre--').select('Indie Rock').should('have.value', 'Indie Rock')
        cy.get('input[name=agreedTOS]').should('be.visible').and('not.be.checked').check()
        cy.get('#submit').should('not.be.disabled')
    })
})

describe('Submit Form', () => {
    it('Looks for a new user card with the correct info', () => {
        cy.get('#submit').click()
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
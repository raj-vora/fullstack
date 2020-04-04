describe('Blog', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
        name: 'Raj Vora',
        username: 'rajvora',
        password: 'qwerty'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
    })

    it('succeeds with correct credentials', function() {
        cy.get('#username').type('rajvora')
        cy.get('#password').type('qwerty')
        cy.get('#login-button').click()
        cy.contains('Raj Vora logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('rajvora')
        cy.get('#password').type('vora')
        cy.get('#login-button').click()
        cy.contains('Wrong username or password')
        cy.get('#notif').should('have.css','color','rgb(255, 0, 0)')
    })
})
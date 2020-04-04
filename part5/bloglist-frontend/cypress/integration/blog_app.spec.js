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
})
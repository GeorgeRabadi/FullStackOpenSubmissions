describe('Blog app', function() {
  beforeEach(function() {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', 
    {username: 'user', name: 'user', password: 'user'})
    .then(response => {      
    cy.visit('http://localhost:5173')})


  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })
  
  describe('Login', function () {
    it('Login is successful', function() {
      cy.get('input:first').type('user')
      cy.get('input:last').type('user')
      cy.contains('login').click()
      cy.contains("user logged into the application")

    })

    it('Login is not successful', function() {
      cy.get('input:first').type('notuser')
      cy.get('input:last').type('notuser')
      cy.contains('login').click()
      cy.contains("Wrong credentials")

    })})


})
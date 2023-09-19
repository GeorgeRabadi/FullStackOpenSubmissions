describe('Blog app', function() {
  beforeEach(function() {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', 
    {username: 'user', name: 'user', password: 'user'})
    .then(response => {      
    cy.visit('http://localhost:5173')})

    cy.request('POST', 'http://localhost:3003/api/users', 
    {username: 'user1', name: 'user1', password: 'user1'})
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

    describe('when logged in', function() {
      beforeEach(function() {

            
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'user', password: 'user'
        }).then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })



      })
    
      it('Blog can be liked', function() {

        cy.contains('Add new blog').click()
        cy.get('#Title').type('Blog Title')
        cy.get('#Author').type('Blog Author')
        cy.get('#URL').type('Blog URL')
        cy.contains('Create').click()
        cy.contains('Blog Title')
        cy.contains('Show details').click()
        cy.contains('Like').click()
        cy.get('#likes').contains('1')


      })

      it('Blog can be deleted', function() {

        cy.contains('Add new blog').click()
        cy.get('#Title').type('Blog Title')
        cy.get('#Author').type('Blog Author')
        cy.get('#URL').type('Blog URL')
        cy.contains('Create').click()
        cy.contains('Blog Title')
        cy.contains('Show details').click()
        cy.contains('Delete').click()
        cy.contains('Blog Title').should('not.exist');


      })

      it.only('Only user who created a blog can see the delete button', function() {

        
        cy.contains('Add new blog').click()
        cy.get('#Title').type('Blog Title')
        cy.get('#Author').type('Blog Author')
        cy.get('#URL').type('Blog URL')
        cy.contains('Create').click()
        cy.contains('Blog Title')
        cy.contains('Show details').click()
        cy.contains('Logout').click()

                 
        cy.get('input:first').type('user1')
        cy.get('input:last').type('user1')
        cy.contains('login').click()

        cy.contains('Blog Title')
        cy.contains('Show details').click()
        cy.get('#delete').should('have.css', 'display', 'none')



      })



    })


})
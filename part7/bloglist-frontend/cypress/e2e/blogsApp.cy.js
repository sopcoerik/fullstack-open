describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Erik',
      username: 'testing',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to see the blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      const correctLoginCredentials = {
        username: 'testing',
        password: 'testing'
      }

      cy.request('POST', 'http://localhost:3001/api/login', correctLoginCredentials)
        .then(response => window.localStorage.setItem('blogListLoggedInUser', JSON.stringify(response.body)))

      cy.visit('http://localhost:5173')

      cy.contains('logged in as Erik')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const correctLoginCredentials = {
        username: 'testing',
        password: 'testing'
      }

      cy.request('POST', 'http://localhost:3001/api/login', correctLoginCredentials)
        .then(response => window.localStorage.setItem('blogListLoggedInUser', JSON.stringify(response.body)))

      cy.visit('http://localhost:5173')
    })

    describe('making operations with blogs', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()

        cy.get('#test--title-input').type('cypress blog')
        cy.get('#test--author-input').type('cycy')
        cy.get('#test--url-input').type('cycyblogs.cy')

        cy.contains('create').click()
      })

      it('A blog can be created', function() {
        cy.contains('Created cypress blog cycy blog')
      })

      it('user can like blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('1 likes')
      })

      it('user can remove blog', function() {
        cy.contains('view').click()
        cy.contains('remove blog').click()

        cy.contains('cypress blog cycy').should('not.exist')
      })
    })
  })
})
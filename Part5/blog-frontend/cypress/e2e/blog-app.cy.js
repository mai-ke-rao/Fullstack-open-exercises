const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {    cy.visit('http://localhost:3000')  })
})


describe('Blog app with database reset', function() {
  beforeEach(function() {

cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username:"Tern",
      name:"Cibkle",
      password:"ajdeajde"
  }
  const user2 = {
    username:"Pyke",
    name:"Dester",
    password:"dester"
}
  cy.request('POST', 'http://localhost:3003/api/users', user)
  cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
     cy.contains("username").find('input')
     cy.contains("password").find('input')
     cy.contains("username").parent().find('button')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('Tern')
      cy.get('#Password').type('ajdeajde')
      cy.get('#Login').click()
      cy.contains('is logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('Tern')
      cy.get('#Password').type('WRONG')
      cy.get('#Login').click()
      cy.contains('wrong user or password')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#Username').type('Tern')
      cy.get('#Password').type('ajdeajde')
      cy.get('#Login').click()

    })

    it('A blog can be created', function() { 
      cy.get('#createnew').click()
      cy.get('#Title').type('Carobna kocija')
      cy.get('#Author').type('Mega Hunter')
      cy.get('#Url').type("Zivimo u vremenu teskom")
      cy.get('#Send').click()
      cy.contains('Carobna kocija')
    })
    describe('With blogs created', function(){
      beforeEach(function (){
        cy.get('#createnew').click()
        cy.get('#Title').type('Carobna kocija')
        cy.get('#Author').type('Mega Hunter')
        cy.get('#Url').type("Zivimo u vremenu teskom")
        cy.get('#Send').click()

      })

it.only('Entries are ordered accoriding to the number of like', function(){

  cy.get('#createnew').click()
  cy.get('#Title').type('Carobni autobus')
  cy.get('#Author').type('Reno Megan')
  cy.get('#Url').type("Kanal D")
  cy.get('#Send').click()

  cy.get('#createnew').click()
  cy.get('#Title').type('MEgabots')
  cy.get('#Author').type('More power')
  cy.get('#Url').type("MEgaPower")
  cy.get('#Send').click()

  cy.contains('Carobna kocija').contains('view').click()
    
  cy.contains('Carobna kocija').contains('likes').find('button').click()
  cy.contains('MEgabots').contains('view').click()
  for(let i=0; i<4; i++){
  cy.contains('MEgabots').contains('likes').find('button').click()
  }
  cy.contains('Carobni autobus').contains('view').click()

  cy.get('.krompir').eq(0).should('contain', 'MEgabots')
  cy.get('.krompir').eq(1).should('contain', 'Carobna kocija')
  cy.get('.krompir').eq(2).should('contain', 'Carobni autobus')
})

      it('Other user cant see a remove button', function(){
        cy.get('#Logout').click()
        cy.get('#Username').type('Pyke')
        cy.get('#Password').type('dester')
        cy.get('#Login').click()

        cy.contains('Carobna kocija').contains('view').click()
        cy.contains('Carobna kocija').contains('Tern').find('button').click()
        cy.get('html').should('contain','Carobna kocija')
      })
    it('User can like a blog', function(){
      cy.contains('Carobna kocija').contains('view').click()
    
      cy.contains('Carobna kocija').contains('likes').find('button').click()
    
        cy.contains('likes: 1')
      })

    it('User is capable of deleting an entry', function(){
      cy.contains('Carobna kocija').contains('view').click()
      cy.contains('Carobna kocija').contains('Tern').find('button').click()
      cy.get('html').should('not.contain','Carobna kocija')


    })

  })
  })




})


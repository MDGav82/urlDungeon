describe('Donjon Abominable - Test E2E basique', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')  // Adapte cette URL si besoin
  })

  it('devrait permettre de résoudre l’énigme du hall et obtenir la clé', () => {
    cy.get('#startEnigmeButton').should('be.visible').click()

    // Attendre que l'input apparaisse
    cy.get('#enigmeInput').should('be.visible').type('réponse correcte')
    cy.get('#validerEnigmeButton').should('be.visible').click()

    // Vérifier que la clé du hall est visible
    cy.get('#cleHall').should('be.visible')
  })

  it('devrait naviguer vers la salle des maths, répondre correctement et obtenir la clé', () => {
    // Clique sur le bouton pour accéder à la salle des maths
    cy.get('#mathsEnigmeButton').should('not.have.class', 'hidden').click()

    // Assure que la section d'énigme est visible
    cy.get('#enigmesSection').should('not.have.class', 'hidden')

    // Résoudre l’énigme des maths
    cy.get('#enigmeInput').should('be.visible').type('42')
    cy.get('#validerEnigmeButton').should('be.visible').click()

    // Vérifier que la clé des maths est visible
    cy.get('#cleMaths').should('be.visible')
  })

  it('devrait afficher le bouton sortie quand toutes les clés sont trouvées', () => {
    // Simule l'état où toutes les clés sont récupérées
    cy.get('#cleHall').should('be.visible')
    cy.get('#cleMaths').should('be.visible')

    // Vérifie que le bouton sortie est affiché
    cy.get('#boutonSortie').should('be.visible')
  })
})

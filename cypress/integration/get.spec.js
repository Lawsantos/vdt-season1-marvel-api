

describe('GET /characters', function(){

    const characters = [
        {    
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men', 'Illuminati'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {   name: 'Peter Parker',
            alias: 'Homem aranha',
            team: ['Novos vingadores'],
            active: true
        }
    ]

    before(function(){
        cy.populateCharacters(characters)      
    })
    
    it('deve retornar uma lista de personagens', function(){        
        cy.getCharacters().then(function(response){
            expect(response.status).to.eq(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function(){
        cy.searchCharacters('Logan').then(function(response){
            expect(response.status).to.eq(200)
            expect(response.body.length).to.eq(1)
            expect(response.body[0].alias).to.eq('Wolverine')
            expect(response.body[0].team).to.eql(['X-men'])
            expect(response.body[0].active).to.eq(true)
        })
    })
})

describe('GET /characters/id', function(){

    const tonyStark = {    
        name: 'Tony Stark',
        alias: 'Homem de ferro',
        team: 	['Vingadores'],
        active: true    
    }

    context('quando tenho um personagem cadastrado', function(){               
        before(function(){            
            cy.postCharacter(tonyStark).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })
    })

    it('deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62bf5cde75fba2047704a20d'
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eq(404)               
            })
    })
})
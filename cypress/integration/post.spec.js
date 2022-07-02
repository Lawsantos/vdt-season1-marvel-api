

describe('POST /characters', function(){
    
    it('deve cadastrar um personagem', function(){
        const character = {
            name: 'Wanda2 Maximoff',
            alias: 'Feiticeira escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })     
    })

    context('quando o personagem já existe', function(){    
        const character = {            
            name: 'Pietro Maximoff',
            alias: 'Mercúrio',
            team: 	['Vingadortes da costa Oeste', 'Irmandade de mutantes'],
            active: true            
        }

        before(function(){
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(201)                
            })
        })
    
        it('não deve cadastrar personagem duplicado', function(){
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})


describe('Segundo conjunto de casos de provas avancado', () => {
  //
  let example: ExampleJSON;

  before(() => {
    // fixture carrega o json com dados da pasta cypress/fixtures/exemplo.json
    // nao e nessesario colocar o tipo de arquivo
    cy.fixture('example').then((data: ExampleJSON) => {
      example = data as ExampleJSON;

      // adicionando url path da imagem
      cy.fixture(example.image).as('image');
    });
  });
  beforeEach(() => {
    // Acessando a pagina para realizamos os testes
    cy.visit('https://demoqa.com/automation-practice-form');
  });
  it('Nosso primeiro formulario usando Data', async () => {
    // capturando o input pelo id
    cy.get('#firstName').type(example.nome);
    cy.get('#lastName').type(example.apelido);
    cy.get('#userEmail').type(example.email);

    cy.get(`input[name="gender"][value="${example.sexo}"]`)
      .then($el => $el)
      .click({ force: true });

    cy.get('#userNumber').type(example.telefone);

    cy.get('#dateOfBirthInput').click();

    cy.get('.react-datepicker__month-select').should('be.visible');

    cy.get('.react-datepicker__month-select').select(example.fichaDeNacimento[0]);
    cy.get('.react-datepicker__year-select').select(example.fichaDeNacimento[1]);
    cy.get(`.react-datepicker__day--0${example.fichaDeNacimento[2]}`)
      .should('be.visible')
      .click()
      .wait(1500);

    cy.get('#dateOfBirthInput').should(
      'contain.value',
      example.fichaDeNacimento[0].slice(0, 3),
    );

    cy.get('#dateOfBirthInput').should('contain.value', example.fichaDeNacimento[1]);
    cy.get('#dateOfBirthInput').should('contain.value', example.fichaDeNacimento[2]);

    cy.get('.subjects-auto-complete__value-container').type(example.subjects);

    cy.get('.subjects-auto-complete__menu-list')
      .find('div')
      .each(($el, index, $list) => {
        if ($el.text() === example.subjects) {
          cy.get('.subjects-auto-complete__menu-list').find('div').eq(index).click();
        }
      });

    cy.get('.subjects-auto-complete__value-container').should(
      'contain.text',
      example.subjects,
    );

    cy.get('#currentAddress')
      .type(example.direccion)
      .should('have.value', example.direccion);

    cy.get('#hobbiesWrapper')
      .find('.custom-control-inline')
      .each(($el, index, $list) => {
        cy.get('#hobbiesWrapper')
          .find('.custom-control-label')
          .eq(index)
          .then($el2 => {
            example.hobbies.map(hobbie => {
              if ($el2.text() === hobbie) {
                cy.get('#hobbiesWrapper')
                  .find('input')
                  .eq(index)
                  .then($el3 => $el3)
                  .click({ force: true });
              }
              return hobbie;
            });
          });
      });

    cy.get('#stateCity-wrapper .css-yk16xz-control').type(example.estado);

    cy.get('.css-26l3qy-menu')
      .find('.css-11unzgr')
      .each(($el, index, $list) => {
        if ($el.text() === example.estado) {
          cy.get('.css-26l3qy-menu').find('.css-11unzgr').eq(index).click();
        }
      });
    cy.get('#stateCity-wrapper .css-1uccc91-singleValue').should(
      'contain.text',
      example.estado,
    );

    cy.get('#city .css-1hwfws3').type(example.cidade);

    cy.get('#city')
      .find('.css-26l3qy-menu')
      .each(($el, index, $list) => {
        if ($el.text() === example.cidade) {
          cy.get('#city').find('.css-26l3qy-menu').eq(index).click();
        }
      });

    cy.get('#city .css-1uccc91-singleValue').should('contain.text', example.cidade);

    cy.get('[class="btn btn-primary"]').click();
  });
});

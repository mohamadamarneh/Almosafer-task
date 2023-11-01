
describe('template spec', () => {
  it('passes', () => {
    //  write URL inside cypress.config.js
    cy.visit('/');

    // we got here already redirection and have parameters and page lang
    // close SAR/USD popup
    cy.get('.cta__saudi').click();

    // to make sure the lang in url includes /en, if not change the language from the button
    cy.url().then((url) => {
      if (!url.includes('/en')) {

        cy.get('[data-testid="Header__LanguageSwitch"]');
      }
    })


    // cy.get('#__next > section.sc-eCXBzT.iAutrZ > div.sc-hfLElm.kZWOqX > div > div > div > h1')
    //  .should('have.text', "Let’s book your next trip!");


    cy.fixture('trip').then((data) => {






      // using const, var is not the best practice but this is a way to choose random data search from fixture file, using it was for the time of challenge so i belive i can do best than this
      const origrion = data.origrion;
      const randomOrigrion = Cypress._.random(0, origrion.length - 1);
      const randomOrigrionItem = origrion[randomOrigrion];


      // wait to end the search for the search key
      cy.intercept("GET", `/api/v3/flights/service/shazam/api/search?query=${randomOrigrionItem}`).as('getSearchResult');
      cy.get('[data-testid="FlightSearchBox__FromAirportInput"]').type(randomOrigrionItem);
      cy.wait('@getSearchResult').its('response.statusCode').should('eq', 200);
      //select item in origion 
      cy.get('[data-testid="AutoCompleteResultsList"]')
        .find(`span:contains("${randomOrigrionItem}")`).first().as('trip1');

      cy.get('@trip1').should('have.text', randomOrigrionItem).click();



      const destination = data.destination;
      const randomDestination = Cypress._.random(0, destination.length - 1);
      const randomDestinationItem = destination[randomDestination];
      // wait to end the search for the search key
      cy.intercept("GET", `/api/v3/flights/service/shazam/api/search?query=${randomDestinationItem}`).as('getSearchResult2');
      cy.get('[data-testid="FlightSearchBox__ToAirportInput"]').type(randomDestinationItem);
      cy.wait('@getSearchResult2').its('response.statusCode').should('eq', 200);
      //select item in origion
      cy.get('[data-testid="AutoCompleteResultsList"]')
        .find(`span:contains("${randomDestinationItem}")`).first().as('trip2');

      cy.get('@trip2').should('have.text', randomDestinationItem).click();





      // this is small system for the range of trip so we can add the range from fixture file from keys [goDate,backDay] (make it randomly by selected range)
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + data.goDate);
      // Get the current year (YYYY)
      const currentYear = currentDate.getFullYear().toString();
      // Get the current month (0-11)
      const currentMonth = currentDate.getMonth();
      // Get the current date (YYYY-MM-dd)
      const currentFormattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      // Log the values for demonstration
      cy.log(`Current Year: ${currentYear}`);
      cy.log(`Current Month: ${currentMonth}`);
      cy.log(`Current Formatted Date: ${currentFormattedDate}`);



      const returnDate = new Date();

      returnDate.setDate(returnDate.getDate() + data.backDay);
      // Get the current year (YYYY)
      const returnYear = returnDate.getFullYear().toString();
      // Get the current month (0-11)
      const returnMonth = returnDate.getMonth();
      // Get the current date (YYYY-MM-dd)
      const returnFormattedDate = `${returnYear}-${(returnMonth + 1).toString().padStart(2, '0')}-${returnDate.getDate().toString().padStart(2, '0')}`;
      // Log the values for demonstration
      cy.log(`return Year: ${returnYear} `);
      cy.log(`return Month: ${returnMonth} `);
      cy.log(`return Formatted Date: ${returnFormattedDate} `);





      // clendar elements for origion
      cy.get('[data-testid="FlightSearchBox__FromDateButton"]').click();
      // origion year value 2023 - 2024
      cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]').first().select(currentYear);
      // origion month     value 0-11
      cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]').first().select(currentMonth);
      // origion day in calendar 
      cy.get(`[data-testid="FlightSearchCalendar__${currentFormattedDate}"]`).first().click();







      // clendar elements for return
      cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]').last().select(returnYear);
      // /// return month     value 0-11
      cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]').last().select(returnMonth);
      // // return day in calendar 
      cy.get(`[data-testid="FlightSearchCalendar__${returnFormattedDate}"]`).last().click();




      /// the defult value is Economy but it should to pass the proccess and i make it dynamic with the others options

      function passengerType(ticketType) {
        cy.get('[data-testid="FlightSearchBox__CabinTypeDropdown"]').click();
        cy.get(`[data-testid="FlightSearchCabinSelection__${ticketType.split(' ').join('')}Option"]`).click();
        cy.get('#uncontrolled-tab-example-tabpane-flights > div > div:nth-child(2) > div > div > div > div > div > div > span')
          .should('include.text', ticketType.split(' ')[0]);
      }
      passengerType(data.passengertype);


      // passengers section 
      // i try to do it responsive as posseble to add cheldren or infants from fixture file for more test cases
      cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').click();

      //assert adults defult value
      cy.get('[data-testid="FlightSearchPAXSelection__AdultsCountLabel"]')
        .should('have.text', 1);

      // adoult/s number
      function adultsCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__AdultsPlusButton"]').click();
          // assert if the adding reflect on the counter
          cy.get('[data-testid="FlightSearchPAXSelection__AdultsCountLabel"]')
            .should('have.text', i + 1);
        }
      }
      adultsCounter(data.adultsPassengerNumber);



      //assert cheldren defult value
      cy.get('[data-testid="FlightSearchPAXSelection__ChildrenCountLabel"]')
        .should('have.text', 0);


      // cheldren number
      function cheldrenCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__ChildrenPlusButton"]').click();
          // assert if the adding reflect on the counter
          cy.get('[data-testid="FlightSearchPAXSelection__ChildrenCountLabel"]')
            .should('have.text', i + 0);
        }
      }
      cheldrenCounter(data.cheldrenPassengerNumber);


      //assert infants defult value
      cy.get('[data-testid="FlightSearchPAXSelection__InfantsCountLabel"]')
        .should('have.text', 0);

      // infants number
      function infantsCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__InfantsPlusButton"]').click();
          // assert if the adding reflect on the counter
          cy.get('[data-testid="FlightSearchPAXSelection__InfantsCountLabel"]')
            .should('have.text', i + 0);
        }
      }
      infantsCounter(data.infantsPassengerNumber);

      cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').click();

      // passenger section end


      // trips page

      cy.get('[data-testid="FlightSearchBox__SearchButton"]').first().click();
      // wait for the result API to fetch the data 
      cy.intercept("POST", '/api/v3/flights/flight/async-search-result').as('getData');
      cy.wait('@getData', { timeout: 20000 }).its('response.statusCode').should('eq', 200);


      // its already selected but to its required 
      cy.get('[data-testid="Cheapest__SortBy__selected"]').click();

      // find the value for the first item, we can do it with more then one way
      cy.get('[data-testid*="_container"]').first()
        .find('[data-testid*="__PriceLabel"]').first().as('cheapestPrice');


      // assert the cheapist value in the button equal the fitst value in first showed item 
      cy.get('@cheapestPrice').invoke('text').then((text) => {
        cy.get('[data-testid="Cheapest__SortBy__selected"]')
          .find('span:contains("Cheapest")')
          .find('div:contains("")').should('contains.text', text)
      });


    });
  })






})
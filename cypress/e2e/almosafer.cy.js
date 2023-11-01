describe('template spec', () => {
  it('passes', () => {
    //  write URL inside cypress.config.js
    cy.visit('/');


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

      const origrion = data.origrion;
      const randomOrigrion = Cypress._.random(0, origrion.length - 1);
      const randomOrigrionItem = origrion[randomOrigrion];
      cy.get('[data-testid="FlightSearchBox__FromAirportInput"]').type(randomOrigrionItem);
      // cy.get('[data-testid="AutoCompleteResultsList"]').children().first().click()
      cy.get('li[data-testid="FlightSearchBox__AirportOption1"]')
        .find(`span:contains("${randomOrigrionItem}")`)
        .should('have.text', randomOrigrionItem);

      cy.get('li[data-testid="FlightSearchBox__AirportOption1"]').click()


      const destination = data.destination;
      const randomDestination = Cypress._.random(0, destination.length - 1);
      const randomDestinationItem = destination[randomDestination];

      cy.get('[data-testid="FlightSearchBox__ToAirportInput"]').type(randomDestinationItem);

      cy.get('li[data-testid="FlightSearchBox__AirportOption1"]').find(`span:contains("${randomDestinationItem}")`)
        .should('have.text', randomDestinationItem);
      cy.get('[data-testid="FlightSearchBox__AirportOption1"]').click();




      // function getNextDayDate() {
      //   const today = new Date();
      //   const nextDay = new Date(today);
      //   nextDay.setDate(today.getDate() + indexDay + dateFromCurrentDay);

      //   const year = nextDay.getFullYear();
      //   const month = String(nextDay.getMonth() + 1).padStart(2, '0');
      //   const day = String(nextDay.getDate()).padStart(2, '0');

      //   return `${year} - ${month} - ${day}`;
      // }




      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 0);
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

      returnDate.setDate(returnDate.getDate() + 138);
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






      // // return clendar element 
      cy.get('[data-testid="FlightSearchBox__FromDateButton"]').click()
      // // go year value 2023 - 2024
      cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]').first().select(currentYear)
      // /// go month     value 0-11
      cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]').first().select(currentMonth)
      // // go day in calendar 
      cy.get(`[data-testid="FlightSearchCalendar__${currentFormattedDate}"]`).first().click()







      // // return year value 2023 - 2024
      cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]').last().select(returnYear)
      // /// return month     value 0-11
      cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]').last().select(returnMonth)
      // // return day in calendar 
      cy.get(`[data-testid="FlightSearchCalendar__${returnFormattedDate}"]`).last().click()


      /// the defult value is Economy but it should to pass the proccess

      cy.get('[data-testid="FlightSearchBox__CabinTypeDropdown"]').click()
      cy.get('[data-testid="FlightSearchCabinSelection__EconomyOption"]').click()

      cy.get('#uncontrolled-tab-example-tabpane-flights > div > div:nth-child(2) > div > div > div > div > div > div > span')
        .should('include.text', 'Economy');



      // passengers section 
      cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').click();



      //assert adults defult value
      cy.get('[data-testid="FlightSearchPAXSelection__AdultsCountLabel"]')
        .should('have.text', 1)

      // adoult/s number
      function adultsCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__AdultsPlusButton"]').click();

          // assert if the adding reflect on the counter
          cy.get('[data-testid="FlightSearchPAXSelection__AdultsCountLabel"]')
            .should('have.text', i + 1)
        }



      }
      adultsCounter(data.adultsPassengerNumber);



      //assert cheldren defult value
      cy.get('[data-testid="FlightSearchPAXSelection__ChildrenCountLabel"]')
        .should('have.text', 0)


      // cheldren number
      function cheldrenCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__ChildrenPlusButton"]').click();

          // assert if the adding reflect on the counter
          cy.get('[data-testid="FlightSearchPAXSelection__ChildrenCountLabel"]')
            .should('have.text', i + 0)
        }
      }
      cheldrenCounter(data.cheldrenPassengerNumber);



      //assert infants defult value
      cy.get('[data-testid="FlightSearchPAXSelection__InfantsCountLabel"]')
        .should('have.text', 0)




      // infants number
      function infantsCounter(num) {
        for (let i = 1; i < num; i++) {
          cy.get('[data-testid="FlightSearchPAXSelection__InfantsPlusButton"]').click();
          cy.get('[data-testid="FlightSearchPAXSelection__InfantsCountLabel"]')
            .should('have.text', i + 0)
        }
      }
      infantsCounter(data.infantsPassengerNumber);


      cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').click();

      // passenger section end

      cy.get('[data-testid="FlightSearchBox__SearchButton"]').first().click();



    });
  })






})
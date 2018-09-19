export const msg = {
  accepted: (memID) => {
    return `<h1>Vaša zahtjev je primljen i obrađuje se br: <a href="http://node.wereact.de/form/${memID}">${memID}</a></h1>`
  },
  declined: (memID) => {
    return `<h1>Vas zahtjev je odbijen</h1>`
  },
  approved: `<h1>Vas zahtjev je odobren</h1>`,
  paymentSlip: (memId) => {
    return `<h1>Vas zahtjev je u obradi</h1>
          <p>Molimo Vas da izvrsite uplatu na br. racuna: xxx,
            <br/>
            u iznosu od xxx.
          </p>
          <br>
          <p>Zatim nas kontaktirajte na broj: xxx ili email: info@uspomene.ba </p>`
  },
  paypal: (memID, paypalID) => {
    return `<h1>PayPal uplata</h1>
          <p>Br. narudžbe: <a href="http://node.wereact.de/form/${memID}">${memID}</a>,<br/>PayPal ID: ${paypalID}</p>`
  },
  cronMsg: (memID, paypalID) => {
    return `<h1>Obavijest o vasoj narudžbi</h1>
          <p>Vaša premium usluga ističe za 7 dana</p>`
  },
  payLater: `<h1>Vaša zahtjev je primljen i obrađuje se, uskoro cete biti kontaktirani.</h1>`,
  payLaterAdmin: (memID) => {
    return `<h1>Pristigla narudžba sa naznakom plati kasnije</h1>
          <a href="http://node.wereact.de/form/${memID}"><p>broj narudžbe: ${memID}</p> </a>`
  }
};

import Memory from '../models/memory';
import sanitizeHtml from 'sanitize-html';
import multer from 'multer';
import { mail } from '../util/mail';
import { msg } from '../util/msgs';
import { getToken } from '../util/getToken';
import paypal from 'paypal-rest-sdk';
import Price from '../models/price';
import { account } from '../util/acc.config';
import latinize from 'latinize';

// Paypal configuration
const acc = account;
paypal.configure({
  mode: 'live',
  client_id: 'AV2k99DxRVDToqSL2_yP2l0Ka2NJnOABr1vwyf7EZ3juAozarLoeUKGfjI-2uhNPh-4R3Ty8RoDyvVMg',
  client_secret: 'EJi02cLj61Sfj0TkvvkfaPVsgevRgdUjtM2CbLWilDoXZLdHAdFR9N84IgdsIEBhZi2IqZq8KPK_gGgc'
});

// Get specific memories
export async function archivedMemories(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const memory = await Memory.find({ $or: [{ status: 'Odobreno' }, { status: 'Stornirano' }, { status: 'Obrisano' }] }).sort('-dateAdded').exec();
      res.json({ memory });
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

export async function pendingMemories(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const memory = await Memory.find({ status: 'Obrada' }).sort('-dateAdded').exec();
      res.json({ memory });
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

export async function approvedMemories(req, res) {
  try {
    const memory = await Memory.find({ status: 'Odobreno' }).sort('-dateAdded').exec();
    if (memory === null) {
      res.status(404).json({ msg: 'Memory not found.' });
    } else {
      res.status(200).json({ memory });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get single memory
export async function oneMemory(req, res) {
  try {
    const memory = await Memory.findById(req.params.id).exec();
    if (memory === null) {
      res.status(404).json({ msg: 'Memory not found.' });
    } else {
      res.status(200).json({ memory });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}


// Get single memory by memoryid 
export async function oneMemoryByID(req, res) {
  try {
    const memory = await Memory.find({ memoryid: req.params.id }).exec();
    if (memory === null) {
      res.status(404).json({ msg: 'Memory not found' })
    } else {
      res.status(200).json({ memory });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create memory
export async function createMemory(req, res) {
  const newMemory = new Memory(req.body.memory);
  newMemory.personalInfo.name.first = sanitizeHtml(newMemory.personalInfo.name.first);
  newMemory.activated = false;
  newMemory.personalInfo.name.last = sanitizeHtml(newMemory.personalInfo.name.last);
  newMemory.personalInfo.email = sanitizeHtml(newMemory.personalInfo.email);
  newMemory.personalInfo.place.city = sanitizeHtml(newMemory.personalInfo.place.city);
  newMemory.personalInfo.place.address = sanitizeHtml(newMemory.personalInfo.place.address);
  newMemory.deceased.name.first = sanitizeHtml(newMemory.deceased.name.first);
  newMemory.deceased.name.last = sanitizeHtml(newMemory.deceased.name.last);
  newMemory.deceased.biography = sanitizeHtml(newMemory.deceased.biography);
  //  newMemory.deceased.religion = sanitizeHtml(newMemory.deceased.religion);
  newMemory.deceased.birthPlace = sanitizeHtml(newMemory.deceased.birthPlace);
  newMemory.deceased.latinBirthPlace = latinize(newMemory.deceased.birthPlace).toLowerCase();
  newMemory.deceased.placeOfDeath = sanitizeHtml(newMemory.deceased.placeOfDeath);
  newMemory.deceased.latinPlaceOfDeath = latinize(newMemory.deceased.placeOfDeath).toLowerCase();
  newMemory.deceased.video = sanitizeHtml(newMemory.deceased.video);
  newMemory.deceased.deathCertificate = sanitizeHtml(newMemory.deceased.deathCertificate);
  newMemory.premium.payStatus = sanitizeHtml(newMemory.premium.payStatus);
  newMemory.note = sanitizeHtml(newMemory.note);
  newMemory.comment = sanitizeHtml(newMemory.comment);
  if (newMemory.deceased.photo.length === 0)
    newMemory.deceased.photo = ['logofinalgold2.png'];

  await newMemory.save()
    .then((result) => {
      mail(newMemory.personalInfo.email, msg.accepted(result.memoryid), 'Nova uspomena');
      res.status(200).json({ memoryid: result.memoryid, message: 'Memory inserted.' });
    }).catch(err => {
      res.status(500).json(err);
    });
}

// Update memory
export async function updateMemory(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const updatedMemory = req.body.memory;
      updatedMemory.personalInfo.name.first = sanitizeHtml(updatedMemory.personalInfo.name.first);
      updatedMemory.personalInfo.name.last = sanitizeHtml(updatedMemory.personalInfo.name.last);
      updatedMemory.personalInfo.email = sanitizeHtml(updatedMemory.personalInfo.email);
      updatedMemory.personalInfo.place.city = sanitizeHtml(updatedMemory.personalInfo.place.city);
      updatedMemory.personalInfo.place.address = sanitizeHtml(updatedMemory.personalInfo.place.address);
      updatedMemory.deceased.name.first = sanitizeHtml(updatedMemory.deceased.name.first);
      updatedMemory.deceased.name.last = sanitizeHtml(updatedMemory.deceased.name.last);
      updatedMemory.deceased.biography = sanitizeHtml(updatedMemory.deceased.biography);
      updatedMemory.deceased.religion = sanitizeHtml(updatedMemory.deceased.religion);
      updatedMemory.deceased.birthPlace = sanitizeHtml(updatedMemory.deceased.birthPlace);
      updatedMemory.deceased.latinBirthPlace = latinize(updatedMemory.deceased.birthPlace);
      updatedMemory.deceased.placeOfDeath = sanitizeHtml(updatedMemory.deceased.placeOfDeath);
      updatedMemory.deceased.latinPlaceOfDeath = latinize(updatedMemory.deceased.placeOfDeath);
      updatedMemory.deceased.deathCertificate = sanitizeHtml(updatedMemory.deceased.deathCertificate);
      updatedMemory.deceased.video = sanitizeHtml(updatedMemory.deceased.video);
      updatedMemory.premium.payStatus = sanitizeHtml(updatedMemory.premium.payStatus);
      updatedMemory.note = sanitizeHtml(updatedMemory.note);
      updatedMemory.comment = sanitizeHtml(updatedMemory.comment);
      await Memory.findByIdAndUpdate(req.params.id, updatedMemory, (err) => {
        if (err) {
          throw err;
        } else {
          res.status(202).json({ message: 'Memory updated' });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// Delete memory
export async function deleteMemory(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      await Memory.findByIdAndUpdate(req.params.id, { status: 'Obrisano' }, (err, result) => {
        if (err) {
          throw err;
        } else {
          mail(result.personalInfo.email, msg.declined(result.memoryid), 'Uspomena je odbijena');
          res.status(202).json({ message: 'Memory deleted' });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// Update memory status
export async function updateStatusMemory(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      await Memory.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { _id: req.params.id }, (err, result) => {
        if (err) {
          throw err;
        } else if (req.body.status === 'Odobreno') {
          mail(result.personalInfo.email, msg.approved, 'Test Uspomene');
        }
        res.status(200).send({ message: 'Status updated' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// Update activated status
export async function updateActivated(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      await Memory.findByIdAndUpdate(req.params.id, { $set: { activated: req.body.activated } }, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: 'Activated updated' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// Upload picture
export async function uploadPicture(req, res) {
  const storag = multer.diskStorage({
    destination: (reqq, file, callback) => {
      callback(null, 'dist/client/slike');
    },
    filename: (reqq, file, callback) => { callback(null, `${Date.now()}-${file.originalname}`); },
  });

  try {
    const upload = await multer({ storage: storag }, {
      limits: {
        fieldNameSize: 50,
        fileSize: 5 * 1024 * 1024,
      },
    }).array('file');
    upload(req, res, (err) => {
      if (err) {
        throw err;
      } else {
        const photos = [];
        req.files.forEach((photoName) => {
          photos.push(photoName.filename);
        });
        res.status(200).send({ message: 'Uploaded', photo: photos });
      }
    });
  } catch (err) {
    res.status(409).json(err);
  }
}

// Upload picture for death certificate
export async function uploadCertificate(req, res) {
  const storag = multer.diskStorage({
    destination: (reqq, file, callback) => {
      callback(null, 'dist/client/slike');
    },
    filename: (reqq, file, callback) => { callback(null, `${Date.now()}-${file.originalname}`); },
  });

  try {
    const upload = await multer({ storage: storag }, {
      limits: {
        fieldNameSize: 50,
        files: 1,
        fileSize: 5 * 1024 * 1024,
      },
    }).single('file');
    upload(req, res, (err) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ message: 'Uploaded', photo: req.file.filename });
      }
    });
  } catch (err) {
    res.status(409).json(err);
  }
}

// Filter
export async function filterMemories(req, res) {
  try {
    if (req.body.filter === null) {
      res.status(404).send("Nobody found!");
    }
    await Memory.find({ $and: req.body.filter }).sort('-dateAdded').exec((err, result) => {
      if (err) {
        throw err;
      } else if (!result) {
        res.status(404).json({ msg: 'No memory found!' });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Paypal control
export async function pay(req, res) {
  const price = await Price.findOne({}, 'value').
  catch(err => { res.status(500).json(err); });
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://node.wereact.de/success',
      cancel_url: 'http://node.wereact.de/cancel'
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Uspomena',
          sku: req.body.id,
          price: price.value,
          currency: 'EUR',
          quantity: 1
        }]
      },
      custom: req.body.id,
      amount: {
        currency: 'EUR',
        total: price.value
      },
      description: 'Premium uspomena'
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          // res.redirect(payment.links[i].href);
          res.status(200).json({ redirect: payment.links[i].href });
        }
      }
    }
  });
}

// Success
export async function success(req, res) {
  const price = await Price.findOne({}, 'value').
  catch(err => { res.status(500).json(err); });
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{
      amount: {
        currency: 'EUR',
        total: price.value
      }
    }]
  };


  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      res.status(400).json(error.response);
    } else {
      const memId = payment.transactions[0].custom;
      const paidAt = payment.create_time;
      Memory.findOneAndUpdate({ memoryid: memId }, { $set: { 'premium.isPremium': true, 'premium.paidAt': paidAt, trackId: payment.id } }).
      then(result => {}).catch(err => {
        res.status(400).json(err)
      });
      res.redirect('/');
      //takodjer s damirom vidjet
      // res.status(200).send('Success');
    }
  });
}

// Cancel
export function cancel(req, res) {
  //res.status(400).send('Failed');
  //to be updated;
  //vidjet s damirom sta tacno ovdje da cini
  res.status(408).json({ redirect: '/', msg: 'Payment was canceled! ' });
}

// Payment by slip
export function payByPaymentSlip(req, res) {
  const handleMail = mail(req.body.email, msg.paymentSlip(req.body.memID), 'Podaci o uplati za uspomenu');
  if (handleMail.msg === 'Success') {
    res.status(200).json({ msg: 'Dobili ste obavijest na mail o načinu uplate.' });
  } else {
    res.status(451).json({ msg: 'Error' });
  }
}

export async function filterGetPug(req, res) {
  const type = req.body.status;
  const resultData = {};
  await Memory.find({ 'premium.isPremium': type, status: 'Odobreno' })
    .sort('-memoryid')
    .skip(req.body.skip * 10)
    .limit(10)
    .exec((err, result) => {
      if (err)
        res.status(400).json(err);
      else {
        if (result.len === null) {
          resultData.count = 0;
          resultData.msg = 'No memories found';
          res.status(200).json(resultData);
        } else {
          resultData.memories = result;
          Memory.count({ 'premium.isPremium': type, status: 'Odobreno' }).exec().then(count => {
            resultData.count = count;
            res.status(200).json(resultData);
          }).catch(err => { throw err; });
          //res.status(200).json(resultData);
        }
      }
    });
}

export async function filterInfScr(req, res) {
  const resultData = {};
  await Memory.find({ status: 'Odobreno' })
    .sort('-dateAdded')
    .skip(req.body.skip * 10)
    .limit(10)
    .exec((err, result) => {
      if (err)
        res.status(400).json(err);
      else {
        if (result.len === null) {
          resultData.count = 0;
          resultData.msg = 'No memories found';
          res.status(200).json(resultData);
        } else {
          resultData.memories = result;
          Memory.count({ status: 'Odobreno' }).exec().then(count => {
            resultData.count = count;
            res.status(200).json(resultData);
          }).catch(err => { throw err; });
          //res.status(200).json(resultData);
        }
      }
    });
}

export function payLater(req, res) {
  mail(req.body.email, msg.payLater, 'Nova uspomena');
  mail(acc.user, msg.payLaterAdmin(req.body.memid), 'Nova uspomena');
  res.status(200).json({ msg: 'Obavijeti su poslate' });
}

// premium memories soon to expired
export async function getSoonToExpireMems(req, res) {
  let currentDate = new Date(Date.now());
  let oldMemories = new Array();
  await Memory.find({ 'premium.isPremium': true }, 'premium memoryid email').then(memory => {
    memory.forEach(item => {
      let date2 = new Date(item.premium.paidAt);
      const timeDiff = Math.abs(currentDate.getTime() - date2.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays >= 358 && diffDays <= 365) {
        console.log(item);
        oldMemories.push(item);
      }
    });
  });
  console.log(oldMemories);
  res.send(oldMemories);
}

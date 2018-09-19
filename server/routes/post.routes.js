import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as MemoryController from '../controllers/memory.controller';
import * as AboutController from '../controllers/about.controller';
import * as PriceController from '../controllers/price.controller';
import passport from 'passport';
require('../util/passport')(passport);
const router = new Router();

// Users
router.route('/api/users')
  .get(passport.authenticate('jwt', { session: false }), UserController.users);
router.route('/api/users/:id')
  .get(passport.authenticate('jwt', { session: false }), UserController.getUser);
router.route('/api/registration')
  .post(UserController.newUser);
router.route('/api/users/:id')
  .put(passport.authenticate('jwt', { session: false }), UserController.updateUser);
router.route('/api/users/chpw/:id')
  .put(passport.authenticate('jwt', { session: false }), UserController.changePassword);
router.route('/api/users/:id')
  .delete(passport.authenticate('jwt', { session: false }), UserController.deleteUser);

// Memories
router.route('/api/memories')
  .get(passport.authenticate('jwt', { session: false }), MemoryController.pendingMemories);
router.route('/api/approvedMemories')
  .get(MemoryController.approvedMemories);
router.route('/api/archivedMemories')
  .get(passport.authenticate('jwt', { session: false }), MemoryController.archivedMemories);
router.route('/api/oneMemory/:id')
  .get(MemoryController.oneMemory);
router.route('/api/memories/new')
  .post(MemoryController.createMemory);
router.route('/api/memories/:id')
  .put(passport.authenticate('jwt', { session: false }), MemoryController.updateMemory);
router.route('/api/memories/:id')
  .delete(passport.authenticate('jwt', { session: false }), MemoryController.deleteMemory);
router.route('/api/update/:id')
  .put(passport.authenticate('jwt', { session: false }), MemoryController.updateStatusMemory);
router.route('/api/updateActivated/:id')
  .put(passport.authenticate('jwt', { session: false }), MemoryController.updateActivated);
router.route('/api/filterMemories')
  .post(MemoryController.filterMemories);
router.route('/api/oldMemories')
  .get(passport.authenticate('jwt', { session: false }), MemoryController.getSoonToExpireMems);
router.route('/api/form/:id')
  .get(MemoryController.oneMemoryByID);

// About us
router.route('/api/about')
  .get(AboutController.getAboutUs);
router.route('/api/aboutCreate')
  .post(AboutController.createAbout); // used to insert first and only about us
router.route('/api/about/:id')
  .put(passport.authenticate('jwt', { session: false }), AboutController.updateAboutUs);

// Picture upload
router.route('/api/picture')
  .post(MemoryController.uploadPicture);
router.route('/api/pictureAbout')
  .post(AboutController.uploadPicture);
router.route('/api/deathCertificate')
  .post(MemoryController.uploadCertificate);

// Price update
router.route('/api/getprice').get(PriceController.getPrice);
router.route('/api/setprice').put(passport.authenticate('jwt', { session: false }), PriceController.setPrice);


// Login
router.route('/login').post(UserController.login);

// Paypal
router.route('/pay').post(MemoryController.pay);
router.route('/success').get(MemoryController.success);
router.route('/cancel').get(MemoryController.cancel);

// Payment by slip
router.route('/paymentSlip').post(MemoryController.payByPaymentSlip);

router.route('/filterGetPug').post(MemoryController.filterGetPug);

router.route('/infScr').post(MemoryController.filterInfScr);

router.route('/payLater').post(MemoryController.payLater);

router.all('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/client' });
});

export default router;

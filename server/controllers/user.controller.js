import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';
import { getToken } from '../util/getToken';

const alg = 'sha512';
const pass = 'd434fgsdfnesto';

function hash(text) {
  const password = crypto.createHmac(alg, pass);
  password.update(text);
  const value = password.digest('hex');

  return value;
}

function checkPassword(id, password) {
  const passwordFromUser = User.findOne({ _id: id }).select({ password: 1 }).exec();
  if (passwordFromUser.password === password) {
    return true;
  }
  return false;
}

function comparePassword(passEntered, passDB) {
  const newPass = hash(passEntered);
  if (newPass === passDB) {
    return true;
  }

  return false;
}

// get users
export async function users(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const user = await User.find({ permission: 'Moderator' }).sort('-dateAdded').exec();
      if (!user) {
        res.status(204).json({ message: 'No moderators.' });
      } else {
        res.status(200).json({ user });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// get one user
export async function getUser(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const user = await User.findById(req.params.id, 'username email permission').exec();
      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      } else {
        res.status(200).json({ user });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// add user
export async function newUser(req, res) {
  const token = getToken(req.headers);

  if (token) {
    if (!req.body.user.username || !req.body.user.password || !req.body.user.email) {
      res.status(403).end();
    }

    const nUser = new User(req.body.user);
    nUser.username = sanitizeHtml(nUser.username);
    nUser.password = sanitizeHtml(nUser.password);
    nUser.email = sanitizeHtml(nUser.email);
    nUser.password = hash(nUser.password);
    await nUser.save()
      .then(result => {
        res.status(200).json({ message: 'User inserted.' });
      }).catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// update user
export async function updateUser(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const updatedUser = req.body.user;

      updatedUser.username = sanitizeHtml(updatedUser.username);
      updatedUser.email = sanitizeHtml(updatedUser.email);
      updatedUser.permission = sanitizeHtml(updatedUser.permission);

      if (checkPassword(req.params.id, updatedUser.password) === false) {
        updatedUser.password = hash(updatedUser.password);
      }

      await User.findByIdAndUpdate(req.params.id, updatedUser, (err) => {
        if (err) {
          throw err;
        } else {
          res.status(202).json({ msg: 'User updated' });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// delete user
export async function deleteUser(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      await User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json({ msg: 'User deleted' });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// login
export async function login(req, res) {
  try {
    await User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        throw err;
      }

      if (!user) {
        res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
      } else {
        if (comparePassword(req.body.password, user.password)) {
          const token = jwt.sign(user._id.toJSON(), config.secret);
          res.json({ success: true, id: user._id, token: `JWT ${token}` });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong username/password.' });
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

// change password
export async function changePassword(req, res) {
  const token = getToken(req.headers);
  if (token) {
    if (!req.body.newPassword || !req.body.oldPassword) {
      res.status(403).end();
    }
    try {
      const user = await User.findById(req.params.id).exec();
      if (comparePassword(req.body.oldPassword, user.password)) {
        const passwordHashed = hash(req.body.newPassword);
        User.findByIdAndUpdate(req.params.id, { $set: { password: passwordHashed } }, (err) => {
          if (err) {
            throw err;
          } else {
            res.status(202).json({ msg: 'Password updated' });
          }
        });
      } else {
        res.status(409).json({ msg: 'Passwords don\'t match!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

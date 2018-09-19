import About from '../models/about';
import sanitizeHtml from 'sanitize-html';
import multer from 'multer';
import { getToken } from '../util/getToken';

// get about us
export async function getAboutUs(req, res) {
  try {
    const about = await About.find({}).exec();
    res.json({ about });
  } catch (err) {
    res.status(500).json(err);
  }
}

// create
export async function createAbout(req, res) {
  try {
    const newAbout = new About(req.body.about);
    newAbout.name = sanitizeHtml(newAbout.name);
    newAbout.text = sanitizeHtml(newAbout.text);
    newAbout.photo = sanitizeHtml(newAbout.photo);
    await newAbout.save(() => {
      res.status(200).json({ message: 'About inserted' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
// update about us
export async function updateAboutUs(req, res) {
  const token = getToken(req.headers);
  if (token) {
    try {
      const updatedAbout = req.body.about;
      updatedAbout.name = sanitizeHtml(updatedAbout.name);
      updatedAbout.text = sanitizeHtml(updatedAbout.text);
      updatedAbout.lastUpdated = Date.now();
      await About.findByIdAndUpdate(req.params.id, updatedAbout, (err, result) => {
        if (err) {
          throw err;
        } else if (result === null) {
          res.status(404).json({ msg: 'No about image' });
        }
        res.status(202).json({ message: 'AboutUs updated' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}

// upload picture for about
export async function uploadPicture(req, res) {
  const storag = multer.diskStorage({
    destination: (reqq, file, callback) => {
      callback(null, 'dist/client/about');
    },
    filename: (reqq, file, callback) => { callback(null, file.originalname); },
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
        res.status(200).send({ message: 'Uploaded', photo: req.file.originalname });
      }
    });
  } catch (err) {
    res.status(409).json(err);
  }
}

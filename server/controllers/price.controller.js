import Price from '../models/price';
import { getToken } from '../util/getToken';

export async function setPrice(req, res) {
  const token = getToken(req.headers);
  if (token) {
    await Price.findOneAndUpdate({}, { $set: { value: req.body.value } }).
    then(() => { res.status(200).json({ msg: 'Price updated' }); }).
    catch(err => { res.status(500).json(err); });
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}
export async function getPrice(req, res) {
  await Price.findOne({}, 'value').
  then(price => { res.status(200).json(price); }).
  catch(err => { res.status(500).json(err); });
}

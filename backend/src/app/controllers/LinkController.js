import * as Yup from 'yup';
import Link from '../models/Link';

class LinkController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(4)
        .required(),
      url: Yup.string()
        .min(4)
        .required(),
      redirect_url: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, user_id, title, url, redirect_url } = await Link.create({
      user_id: req.userId,
      ...req.body,
    });

    return res.json({ id, user_id, title, url, redirect_url });
  }
}

export default new LinkController();

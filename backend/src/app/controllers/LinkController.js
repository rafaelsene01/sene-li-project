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

    const linkExists = await Link.findOne({ where: { url: req.body.url } });

    if (linkExists) {
      return res.status(400).json({ error: 'Url already exists.' });
    }

    const { id, user_id, title, url, redirect_url } = await Link.create({
      user_id: req.userId,
      ...req.body,
    });

    return res.json({ id, user_id, title, url, redirect_url });
  }

  async index(req, res) {
    const page = req.query.page || 1;

    const links = await Link.findAll({
      where: { user_id: req.userId },
      limit: 30,
      offset: (page - 1) * 30,
      order: [['id', 'DESC']],
    });

    return res.json(links);
  }

  async show(req, res) {
    const link = await Link.findOne({
      where: { url: req.params.link },
    });

    if (!link) {
      return res.status(400).json({ error: 'Link does not exist.' });
    }
    const { redirect_url } = link;

    return res.json({ redirect_url });
  }
}

export default new LinkController();

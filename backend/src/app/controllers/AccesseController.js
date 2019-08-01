import Accesse from '../models/Accesse';

class AccesseController {
  async show(req, res) {
    const accesse = await Accesse.findAll({
      where: { link_id: req.params.link_id, user_id: req.userId },
      attributes: [
        [
          Accesse.sequelize.fn(
            'date_trunc',
            'day',
            Accesse.sequelize.col('created_at')
          ),
          'date',
        ],
        [Accesse.sequelize.fn('count', Accesse.sequelize.col('id')), 'count'],
      ],
      group: '"date"',
      order: Accesse.sequelize.literal('date DESC'),
      limit: 5,
    });

    if (!accesse) {
      return res.status(400).json({ error: 'there is no access' });
    }

    const labels = accesse.map(label => label.dataValues.date);
    labels.reverse();
    const data = accesse.map(label => label.dataValues.count);
    data.reverse();

    return res.json({ labels, data });
  }
}

export default new AccesseController();

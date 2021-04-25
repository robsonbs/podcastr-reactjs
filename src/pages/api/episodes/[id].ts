import { NextApiRequest, NextApiResponse } from 'next';
import { episodes } from '../../../../server.json';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  file: {
    duration: number;
    url: string;
  };
};

export default (req: NextApiRequest, res: NextApiResponse<Episode>): void => {
  const { id } = req.query;
  const [episode] = episodes.filter(item => item.id === id);
  res.status(200).json(episode);
};

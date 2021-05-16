import { RequestHandler } from 'express';

const exampleController: RequestHandler = (req, res) => {
    res.json({ example: 'example' });
};

export default exampleController;

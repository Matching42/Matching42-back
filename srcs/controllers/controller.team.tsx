import { RequestHandler } from 'express';

const addMember: RequestHandler = (req, res) => {
    res.json({ example: 'example' });
};

export default addMember;

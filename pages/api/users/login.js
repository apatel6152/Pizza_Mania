import dbConnect from '../../../utils/mongoConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  await dbConnect();
  const { email, password } = req.body;

  // console.log(req.body)
  try {
    if (req.method === 'POST') {
      if (!email || !password) {
        return res.status(422).json({ error: 'please enter all the fields' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User Not Found' });
      }
      const doMatch = await bcrypt.compare(password, user.password);
      //   if (!doMatch) {
      //     return res.status(401).json({ error: 'Invalid credentials' });
      //   }
      if (doMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        const { email, _id, name } = user;
        console.log(token);
        res.status(201).json({
          token,
          user: { email, _id , name},
          message: 'login successful',
        });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

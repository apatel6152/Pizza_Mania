import dbConnect from '../../../styles/utils/mongoConnect';
import User from '../../../models/User';
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
      const { email, password , firstName, lastName} = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: 'please enter all the fields' });
      }
    console.log(email, password, firstName, lastName);

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(422).json({ error: 'User already exists' });
    }

    const HashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      email: email,
      password: HashedPassword,
      name: `${firstName} ${lastName}`,
    }).save();
    console.log(newUser);
    res.status(201).json({message: "Sign Up Success"});
  }
}

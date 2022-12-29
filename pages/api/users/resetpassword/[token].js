import dbConnect from '../../../../utils/mongoConnect';
import User from '../../../../models/User';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import absoluteUrl from "next-absolute-url"

export default async function handler(req, res) {
  await dbConnect();
  // console.log(req.body)
  try {
    if (req.method === "PUT") {
      const { token } = req.query

      const { newPassword, conNewPassword } = req.body

      if (newPassword !== conNewPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password needs to be at least 6 characters" })
      }

      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
      }

      const user = await User.findById(req.user._id)

      if (user) {
        user.password = await bcrypt.hash(newPassword, 12)

        user.resetToken = undefined
        await user.save()

        return res.status(200).json({ message: "success in updating user password" })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

import mongoose, { Schema } from "mongoose";

const stacks = ["Frontend", "Backend", "Fullstack", "Low-code"] as const;
type Stack = (typeof stacks)[number];

interface IProject {
  name: string;
  url: string;
  stack: Stack;
}

interface IUser {
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  title: string;
  subtitle: string;
  projects: IProject[];
  skills: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  githubUrl: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  projects: {
    type: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        stack: { type: String, required: true, enum: stacks },
      },
    ],
    required: true,
  },
  skills: {
    type: [{ type: String, required: true }],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "Skills cannot be empty",
    },
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;

// const user = new User({
//   name: "Marcelo",
//   email: "marceloaflemes@gmail.com",
//   githubUrl: "https://github.com/marceloafl/",
//   linkedinUrl: "https://www.linkedin.com/in/marceloafl/",
//   title: "SOFTWARE DEVELOPER",
//   subtitle: "Crafting transformative solutions that solve real-world issues.",
//   projects: [
//     {
//       name: "Birmingham Bank",
//       url: "https://www.birminghambank.com/services/savings/",
//       stack: "Frontend",
//     },
//     {
//       name: "Grupo FCamara",
//       url: "https://fcamara.com/",
//       stack: "Fullstack",
//     },
//   ],
//   skills: ["Javascript", "Typescript"],
// });

// // await user
// //   .save()
// //   .then("Saved")
// //   .catch((error) => console.log(error));

// // await User.deleteMany({});

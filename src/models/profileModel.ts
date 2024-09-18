import mongoose, { Schema } from "mongoose";

const stacks = ["Frontend", "Backend", "Fullstack", "Low-code"] as const;
type Stack = (typeof stacks)[number];

interface IProject {
  name: string;
  url: string;
  stack: Stack;
}

export interface IProfile {
  name: string;
  email: string;
  password: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  title: string;
  subtitle: string;
  projects: IProject[];
  skills: string[];
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  stack: { type: String, required: true, enum: stacks },
});

const profileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactEmail: { type: String, required: true },
  githubUrl: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  projects: {
    type: [projectSchema],
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

const Profile = mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;

import Profile, { IProfile } from "../models/profileModel.js";

export const getAllProfiles = async () => {
  return await Profile.find();
};

export const getProfileById = async (id: string) => {
  return await Profile.findById(id);
};

export const createProfile = async (profileData: IProfile) => {
  const newProfile = new Profile(profileData);
  return await newProfile.save();
};

export const deleteProfile = async (id: string) => {
  return await Profile.findByIdAndDelete(id);
};

export const updateProfile = async (id: string, updateData: IProfile) => {
  return await Profile.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

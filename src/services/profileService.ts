import { IProfile } from "../models/profileModel.js";
import * as profileRepository from "../repositories/profileRepository.js";

export const getAllProfiles = async () => {
  return await profileRepository.getAllProfiles();
};

export const getProfileById = async (id: string) => {
  return await profileRepository.getProfileById(id);
};

export const createProfile = async (profileData: IProfile) => {
  return await profileRepository.createProfile(profileData);
};

export const deleteProfile = async (id: string) => {
  return await profileRepository.deleteProfile(id);
};

export const updateProfile = async (id: string, updateData: IProfile) => {
  return await profileRepository.updateProfile(id, updateData);
};

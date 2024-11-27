import { IPhotoModel } from "./photo.model";

export interface IMemberModel {
  id:           number;
  username:     string;
  age:          number;
  photoUrl:     string;
  knownAs:      string;
  created:      Date;
  lastActive:   Date;
  gender:       string;
  introduction: null;
  interests:    null;
  lookingFor:   null;
  city:         string;
  country:      string;
  photos:       IPhotoModel[];
}


import React, { createContext, useContext, useState } from "react";
import { AxiosContext } from "./AxiosContext";
import { RootContext } from "./RootContext";

const ProfileContext = createContext(undefined);

const ProfileContextProvider = (props) => {
  const { setLoading, showToast } = useContext(RootContext);
  const { axiosInstance } = useContext(AxiosContext);
  const [profileTabIndex, setProfileTabIndex] = useState(0);
  const [parentProfile, setParentProfile] = useState({
    completed: false,
    error: false,
    fullname: '',
    personalnumber: '',
    dob: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    role: ''
  });
  const [partnerProfile, setPartnerProfile] = useState({
    completed: false,
    error: false,
    nopartner: false,
    fullname: '',
    email: '',
    personalnumber: '',
    dob: '',
    role: ''
  });
  const [childProfile, setChildProfile] = useState({
    completed: false,
    error: false,
    fullname: '',
    personalnumber: '',
    dob: ''
  });

  const GenerateFamilyProfile = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'generateFamilyProfile',
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('-- generate profile res --', data);
      if (data.success) {
        // setFamilyProfile(data.profile);
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
    });
  }

  const GetFamilyProfile = () => {
    setLoading(true);
    return axiosInstance({
      method: 'GET',
      url: 'getFamilyProfile',
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      if (data.success) {
        const profile = data.data.profile;
        console.log('== fprofile ==', profile);
        if (profile?.family_parent) {
          let _parentProfile = {...parentProfile};
          _parentProfile.completed = family_parent.completed;
          _parentProfile.fullname = family_parent.fullname;
          _parentProfile.personalnumber = family_parent.personalnumber;
          _parentProfile.phone = family_parent.phone;
          _parentProfile.address1 = family_parent.address1;
          _parentProfile.address2 = family_parent.address2;
          _parentProfile.city = family_parent.city;
          _parentProfile.zip = family_parent.zip;
          _parentProfile.role = family_parent.role;
          setParentProfile(_parentProfile);
        }
        if (profile?.family_partner) {
          let _partnerProfile = {...partnerProfile};
          _partnerProfile.completed = family_partner.completed;
          _partnerProfile.nopartner = family_partner.nopartner;
          _partnerProfile.fullname = family_partner.fullname;
          _partnerProfile.email = family_partner.email;
          _partnerProfile.personalnumber = family_partner.personalnumber;
          _partnerProfile.role = family_partner.role;
          setPartnerProfile(_partnerProfile);
        }
        if (profile?.family_child) {
          let _childProfile = {...childProfile};
          _childProfile.completed = family_child.completed;
          _childProfile.fullname = family_child.fullname;
          _childProfile.personalnumber = family_child.personalnumber;
        }
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
    });
  }

  const UpdateParentProfile = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'updateParentProfile',
      data: parentProfile
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('-- updateParentProfile --', data);
      if (data.success) {
        // setFamilyProfile(data.profile);
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
    });
  }

  const UpdatePartnerProfile = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'updatePartnerProfile',
      data: partnerProfile
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('-- updatePartnerProfile --', data);
      if (data.success) {
        // setFamilyProfile(data.profile);
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
    });
  }

  const UpdateChildProfile = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'updateChildProfile',
      data: childProfile
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('-- updateChildProfile --', data);
      if (data.success) {
        // setFamilyProfile(data.profile);
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
    });
  }

  const providerValue = {
    profileTabIndex, setProfileTabIndex,
    parentProfile, setParentProfile,
    partnerProfile, setPartnerProfile,
    childProfile, setChildProfile,
    // 
    GenerateFamilyProfile,
    GetFamilyProfile,
    UpdateParentProfile,
    UpdatePartnerProfile,
    UpdateChildProfile
  }

  return (
    <ProfileContext.Provider value={providerValue}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export {
  ProfileContext, ProfileContextProvider
}

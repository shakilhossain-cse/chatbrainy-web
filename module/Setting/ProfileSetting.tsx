"use client";
import useProfile from "./hooks/useProfile";

const ProfileSetting = () => {
  const { data } = useProfile();
  return (
    <div>
      <pre>
        {JSON.stringify(data)}
      </pre>
    </div>
  );
};

export default ProfileSetting;

"use client"; import axios from "axios";
import Header from "./_components/header";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailContext";
function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    user && CheckUserAuth();
  }, [user]);
  const CheckUserAuth = async () => {
    const result = await axios.post('/api/users', {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    setUserDetail(result.data);
  };
  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <Header />
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4">
          {children}
        </div>
      </UserDetailContext.Provider>
    </div>
  );
}
export default Provider;
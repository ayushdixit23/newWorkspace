"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Authcheck = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [auth, setAuth] = useState();

    // useEffect(() => {
    //   const isAuthenticated = sessionStorage.getItem("id");
    //   if (!isAuthenticated) {
    //     setAuth(true);
    //     toast.error("UnAuthorized... ");
    //     router.push("/login");
    //   }
    // }, []);

    // if (auth) {
    //   return (
    //     <div>
    //       <Toaster />
    //     </div>
    //   );
    // }

    // return <WrappedComponent {...props} />;
  };

  // return Wrapper;
};

export default Authcheck;

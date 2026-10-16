import React from "react";
import MyProfile from "../components/MyProfile"

function Home() {
  return (
    <div className="px-6 sm:px-12 md-px-20 lg:px-32">
      {/* <h1 className="text-3xl sm:text-4xl font-bold pb-6 text-center">About Me</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-3 bg-base-100 shadow-sm rounded-lg overflow-hidden p-6 gap-6">

        <MyProfile />

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold"><strong>I'm Art Pregoner</strong></h1>
          <h1 className="text-3xl font-bold"><strong>Web Developer</strong></h1>
        </div>

      </div>
    </div>
  );
}

export default Home;

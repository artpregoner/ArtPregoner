import React from "react";
import MyProfile from "../components/MyProfile"


function About() {
  return (
    <div className="px-6 sm:px-12 md-px-20 lg:px-32">
      {/* <h1 className="text-3xl sm:text-4xl font-bold pb-6 text-center">About Me</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-3 bg-base-100 shadow-sm rounded-lg overflow-hidden p-6 gap-6">

        <MyProfile />

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">About Me</h1>
          <p className="text-gray-600 dark:text-gray-500">
            Hi! I'm <strong>Art Pregoner</strong>, a <strong>4th-year college</strong> student pursuing a <strong>Bachelor of College in Information Technology (BSIT)</strong>.
          </p>
          <p className="text-gray-600 dark:text-gray-500">
            I am passionate about <strong>web development</strong> and specialize in the <strong>Laravel stack</strong>. I enjoy building modern, user-friendly websites and continuously improving my skills in both <strong>backend and frontend development</strong>, particularly using <strong>Tailwind CSS</strong>.
          </p>
          <p className="text-gray-600 dark:text-gray-500">
            Currently, I'm working on a school project, and while I don't have professional experience in the IT industry yet, I actively use <strong>AI to enhance my learning and expand my knowledge</strong>. I'm also exploring <strong>web development with React and Tailwind CSS</strong> to sharpen my skills and stay updated with modern technologies.
          </p>
          <p className="text-gray-600 dark:text-gray-500">
            I believe in <strong>leveraging technology, including AI, to improve problem-solving and accelerate learning</strong>. Let's connect and build something amazing! 🚀
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold pb-2">Skills</h2>
          <div className="w-full max-w-md">
            {[
              { skill: "HTML", value: 50 },
              { skill: "CSS", value: 10 },
              { skill: "JavaScript", value: 5 },
              { skill: "Bootstrap", value: 30 },
              { skill: "Tailwind", value: 10 },
              { skill: "Laravel", value: 30 },
              { skill: "React", value: 5 },
              { skill: "MySQL", value: 5 },
            ].map(({ skill, value }) => (
              <div key={skill} className="mb-3">
                <div className="tooltip w-full" data-tip={`${value}% proficiency`}>
                  <p className="text-gray-600 text-sm sm:text-base">{skill}</p>
                  <progress className="progress progress-info w-full" value={value} max="100"></progress>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

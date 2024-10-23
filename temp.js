[
  {
    role: "user",
    message: [
      'You are the interviewers conducting an interview for a fresher backend developer position. Create three professional interviewers with distinct roles relevant to the interview. Initialize the interview by introducing the interviewers, and proceed with the questions in a conversational and realistic manner. Start with an introduction of all interviewers for example-  [\n{\n  "interviewer_name": "Rajesh Sharma, Engineering Manager",\n  "message": "Hello everyone, I\'m Rajesh Sharma, the Engineering Manager for the backend team. I\'ll be leading this interview today.",\n  "id":0\n\n},\n{\n  "interviewer_name": "Emily Patel, Senior Backend Developer",\n  "message": "Hi, I\'m Emily Patel, a Senior Backend Developer on the team. I\'ll be evaluating your technical skills and experience.",\n  "id":1\n},\n{\n  "interviewer_name": "David Lee, Technical Recruiter",\n  "message": "Hello, I\'m David Lee, the Technical Recruiter who worked with you to schedule this interview. I\'ll be taking notes and ensuring the process runs smoothly. Are You comfortable with the interview?",\n  "id":2\n},\n]\n\n\n\nProvide the output in the following JSON format\n\ngive output like - output={"interviewer_name": "Rajesh Sharma, Engineering Manager","message": "Hello","id":0}\n\nif want to pass the conversation to another interviewer also include the reply of the another interviewer\n\ntailor is for user preference - {\'role\': \'Software Developer\', \'field\': \'Python\', \'experience\': \'0-1\', \'scenario\': \'interview\', \'purpose\': \'Job\', \'toimprove\': [\'technical\', \'communication\']}',
    ],
  },
  { role: "user", message: "Hello Hello \nP " },
];

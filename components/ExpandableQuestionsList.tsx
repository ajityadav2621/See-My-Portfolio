// // components/ExpandableQuestionsList.tsx
// "use client"
// import { useState } from 'react';

// interface Question {
//   id: string;
//   text: string;
//   content?: React.ReactNode;
// }

// const ExpandableQuestionsList: React.FC = () => {
//   const [questions] = useState<Question[]>([
//     { id: 'skills', text: 'Do you want to know a bit about my skills and expertise?' },
//     { id: 'aiml', text: 'Curious about the AI/ML projects I\'ve worked on?' },
//     { id: 'spotify', text: 'Want to hear about my custom Spotify-like music player application?' },
//     { id: 'auth', text: 'Interested in how I approach building user authentication systems?' },
//     { id: 'collaboration', text: 'Would you like to know about my experience collaborating on AI/ML projects?' },
//     { id: 'structure', text: 'Want to know how I structure and organize my React applications?' },
//   ]);

//   return (
//     <section className="py-12 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto p-6 rounded-xl bg-black border border-gray-800">
//         {questions.map((question) => (
//           <QuestionItem key={question.id} question={question} />
//         ))}
//       </div>
//     </section>
//   );
// };

// interface QuestionItemProps {
//   question: Question;
// }

// const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div 
//       className="border-b border-gray-800 py-4 last:border-b-0"
//       onClick={toggleExpanded}
//     >
//       <div className="flex items-center cursor-pointer">
//         <div className="flex-shrink-0 mr-3">
//           <div className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-600 text-gray-400">
//             {isExpanded ? '−' : '+'} 
//           </div>
//         </div>
//         <span className="text-gray-200 text-lg">{question.text}</span>
//       </div>
//       {isExpanded && (
//         <div className="mt-4 pl-10 pr-4 text-gray-400">
//           {question.content || 
//             <p>This is the expanded content for: {question.text}</p>
//           }
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpandableQuestionsList;

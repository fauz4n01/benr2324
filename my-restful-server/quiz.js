const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://fauzan:lmaolmao@fauzan.1ml0u5f.mongodb.net/?retryWrites=true&w=majority&appName=fauzan";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const quiz = [
  {
    question: "Which component is known as the brain of the computer?",
    options: ["a) Hard Drive", "b) RAM", "c) CPU", "d) Power Supply"],
    answer: "c) CPU"
  },
  {
    question: "What does RAM stand for?",
    options: ["a) Random Access Memory", "b) Readily Available Memory", "c) Real-time Access Memory", "d) Read Access Memory"],
    answer: "a) Random Access Memory"
  },
  {
    question: "Which of the following is a programming language?",
    options: ["a) HTML", "b) CSS", "c) Python", "d) SQL"],
    answer: "c) Python"
  },
  {
    question: "What is the purpose of an operating system?",
    options: ["a) To manage hardware and software resources", "b) To provide internet access", "c) To perform data backups", "d) To design web pages"],
    answer: "a) To manage hardware and software resources"
  },
  {
    question: "Which device is used to connect a computer to a network?",
    options: ["a) Monitor", "b) Keyboard", "c) Router", "d) Printer"],
    answer: "c) Router"
  },
  {
    question: "What is the main function of the ALU (Arithmetic Logic Unit)?",
    options: ["a) To perform arithmetic and logical operations", "b) To store data", "c) To manage input and output devices", "d) To control data flow"],
    answer: "a) To perform arithmetic and logical operations"
  },
  {
    question: "Which of the following is an example of an input device?",
    options: ["a) Monitor", "b) Printer", "c) Keyboard", "d) Speaker"],
    answer: "c) Keyboard"
  },
  {
    question: "What does BIOS stand for?",
    options: ["a) Basic Input Output System", "b) Binary Input Output System", "c) Basic Integrated Operating System", "d) Binary Integrated Operating System"],
    answer: "a) Basic Input Output System"
  },
  {
    question: "Which type of memory is non-volatile and can be electrically erased and reprogrammed?",
    options: ["a) RAM", "b) ROM", "c) Flash Memory", "d) Cache Memory"],
    answer: "c) Flash Memory"
  },
  {
    question: "Which protocol is used to transfer web pages on the internet?",
    options: ["a) FTP", "b) SMTP", "c) HTTP", "d) SSH"],
    answer: "c) HTTP"
  }
];

async function main() {
  try {
    await client.connect();

    // Create a database and collection
    const database = client.db("quiz");
    const collection = database.collection("questions");

    // Insert the quiz questions into the collection
    await collection.insertMany(quiz);

    // Render the quiz
    console.log("Quiz:");
    quiz.forEach((question, index) => {
      console.log(`Question ${index + 1}: ${question.question}`);
      console.log("Options:");
      question.options.forEach((option, index) => {
        console.log(`  ${index + 1}. ${option}`);
      });
      console.log(`Answer: ${question.answer}`);
      console.log();
    });

    // Check answers
    let score = 0;
    quiz.forEach((question, index) => {
      const answer = prompt(`Enter your answer for question ${index + 1}: `);
      if (answer === question.answer) {
        score++;
      }
    });

    console.log(`You scored ${score} out of ${quiz.length}!`);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
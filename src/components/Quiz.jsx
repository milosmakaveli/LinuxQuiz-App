
import { useState, useLayoutEffect, useRef } from "react";
import useQuizStore from "../zustand/store";
import './Quiz.css'
import { GrLinkNext } from "react-icons/gr";
import { RiResetRightLine } from "react-icons/ri";
import ReactConfetti from "react-confetti";


const Quiz = () => {
    const questions = useQuizStore((state) => state.questions);
    const answers = useQuizStore((state) => state.answers);
    const score = useQuizStore((state) => state.score);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const setAnswer = useQuizStore((state) => state.setAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const resetQuiz = useQuizStore((state) => state.resetQuiz);

    const [submitted, setSubmitted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const quizContainerRef = useRef(null);

    useLayoutEffect(() => {
        if (quizContainerRef.current) {
            const { offsetWidth, offsetHeight } = quizContainerRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    const question = questions[currentQuestionIndex];

   
    const handleAnswerChange = (selectedAnswer) => {
        setAnswer(question.id, selectedAnswer);
    };

    const handleSubmit = () => {
        setSubmitted(true); 
    };

    const handleReset = () => {
        resetQuiz(); 
        setSubmitted(false); 
    };

    return (
        <div className="quiz-container" ref={quizContainerRef}>
            <div className="question-index">
                {currentQuestionIndex + 1} / {questions.length}
            </div>

            {submitted && (
                <ReactConfetti
                    width={dimensions.width}
                    height={dimensions.height}
                />
            )}
            <div className="question-container">
                <p className="question">{question.question}</p>

                <div className="options-container">
                    {question.options.map((option, index) => {
                        const optionLabel = String.fromCharCode(65 + index); 
                        return (
                            <button
                                key={optionLabel}
                                className={`answer-btn ${answers[question.id] === option ? 'selected' : ''}`}
                                onClick={() => handleAnswerChange(option)}
                                disabled={submitted} 
                            >
                                {optionLabel}. {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="submit-container">
                {submitted ? (
                    <p className="score">Your score is: {score} / {questions.length}</p>
                ) : (
                    <div>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <GrLinkNext className="next-btn" onClick={nextQuestion}>Next Question</GrLinkNext>
                        ) : (
                            <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
                        )}
                    </div>
                )}
            </div>

            <div className="reset-container">
                <RiResetRightLine className="reset-btn" onClick={handleReset}>Reset Quiz</RiResetRightLine>
            </div>
        </div>

    );
}

export default Quiz;
'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/data/booziversity';

interface QuizProps {
    questions: QuizQuestion[];
    onComplete: () => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizFinished, setQuizFinished] = useState(false);

    if (!questions || questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (index: number) => {
        if (isCorrect !== null) return; // Prevent changing answer after submitting
        setSelectedOption(index);
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;

        const correct = selectedOption === currentQuestion.correctAnswerIndex;
        setIsCorrect(correct);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setQuizFinished(true);
            onComplete();
        }
    };

    const handleRetry = () => {
        setSelectedOption(null);
        setIsCorrect(null);
    };

    if (quizFinished) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">Quiz Passed!</h3>
                <p className="text-emerald-200/80 mb-6">You have successfully mastered this lesson's core concepts.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded text-emerald-400 text-sm font-bold tracking-wider uppercase border border-emerald-500/50">
                    + Lesson Completed
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
                Knowledge Check {currentIndex + 1} <span className="text-gray-600">/ {questions.length}</span>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-white mb-8 mt-4 leading-relaxed pr-16">
                {currentQuestion.question}
            </h3>

            <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const showCorrect = isCorrect !== null && idx === currentQuestion.correctAnswerIndex;
                    const showWrong = isCorrect === false && isSelected;

                    let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ";

                    if (showCorrect) {
                        buttonClass += "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                    } else if (showWrong) {
                        buttonClass += "bg-red-500/20 border-red-500/50 text-white";
                    } else if (isSelected) {
                        buttonClass += "bg-[var(--primary)]/20 border-[var(--primary)] text-white";
                    } else if (isCorrect !== null) {
                        buttonClass += "bg-[var(--surface)] border-[var(--border)] text-gray-500 opacity-50 cursor-not-allowed";
                    } else {
                        buttonClass += "bg-[var(--bg)] border-[var(--border)] text-gray-300 hover:border-[var(--primary)]/50 hover:bg-[var(--surface-hover)] cursor-pointer shadow-sm";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={isCorrect !== null}
                            className={buttonClass}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-[0.95rem] md:text-base pr-4 leading-tight">{option}</span>
                                {showCorrect && <span className="text-emerald-400 font-bold ml-2 shrink-0">✓</span>}
                                {showWrong && <span className="text-red-400 font-bold ml-2 shrink-0">✗</span>}
                            </div>
                        </button>
                    );
                })}
            </div>

            {isCorrect !== null && currentQuestion.explanation && (
                <div className={`p-6 rounded-2xl mb-8 border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'} animate-fade-in-up shadow-sm`}>
                    <h4 className={`text-sm font-bold tracking-widest uppercase mb-2 flex items-center gap-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCorrect ? (
                            <><span className="text-lg">✓</span> Knowledge Verified</>
                        ) : (
                            <><span className="text-lg">✗</span> Let's Review</>
                        )}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{currentQuestion.explanation}</p>
                </div>
            )}

            <div className="flex justify-end mt-4">
                {isCorrect === null ? (
                    <button
                        onClick={handleCheckAnswer}
                        disabled={selectedOption === null}
                        className={`px-8 py-3 rounded-full font-bold transition-all ${selectedOption !== null
                                ? "bg-[var(--primary)] text-white hover:shadow-[0_0_15px_var(--primary-glow)] hover:scale-105"
                                : "bg-[var(--bg)] text-gray-500 cursor-not-allowed border border-[var(--border)]"
                            }`}
                    >
                        Check Answer
                    </button>
                ) : isCorrect ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold transition-transform hover:scale-105 shadow-[0_4px_15px_rgba(16,185,129,0.3)] animate-pulse"
                    >
                        {currentIndex < questions.length - 1 ? "Next Question ➔" : "Complete Lesson 🎓"}
                    </button>
                ) : (
                    <button
                        onClick={handleRetry}
                        className="px-8 py-3 bg-[var(--bg)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-white rounded-full font-bold transition-colors shadow-sm"
                    >
                        Try Again ↺
                    </button>
                )}
            </div>
        </div>
    );
}

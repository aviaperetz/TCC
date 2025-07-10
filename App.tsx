import React, { useState } from 'react';
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import Footer from './components/Footer';
import AnimatedElement from './components/AnimatedElement';
import VideoModal from './components/VideoModal';
import { LESSONS } from './constants';
import type { Lesson } from './types';

const App: React.FC = () => {
  const backgroundImageUrl = 'https://i.postimg.cc/mkZBCW52/image.jpg';
  const [playingLesson, setPlayingLesson] = useState<Lesson | null>(null);
  const [loadingLessonId, setLoadingLessonId] = useState<number | null>(null);

  const handlePlayLesson = (lesson: Lesson) => {
    setLoadingLessonId(lesson.id);
    // Simulate a short delay for user feedback and animation
    setTimeout(() => {
      setPlayingLesson(lesson);
      setLoadingLessonId(null);
    }, 400);
  };

  const handleCloseModal = () => {
    setPlayingLesson(null);
  };

  return (
    <>
      <div 
        className="min-h-screen text-stone-200 selection:bg-amber-500 selection:text-black bg-cover bg-center bg-fixed"
        style={{backgroundImage: `url(${backgroundImageUrl})`}}
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-75" 
          style={{backgroundImage: 'radial-gradient(circle at top right, rgba(189, 149, 78, 0.15), transparent 60%)'}}
        ></div>
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <AnimatedElement className="flex justify-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-amber-400">השיעורים שלך</h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {LESSONS.map((lesson, index) => (
                <AnimatedElement key={lesson.id} delay={index * 100}>
                  <LessonCard
                    lesson={lesson}
                    onPlay={handlePlayLesson}
                    isLoading={loadingLessonId === lesson.id}
                  />
                </AnimatedElement>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
      {playingLesson && (
        <VideoModal lesson={playingLesson} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;
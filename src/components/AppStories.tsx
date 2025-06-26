import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '../assets/logo.png';
import location from '../assets/location.png';
import kurta from '../assets/kurta.png';
import mango from '../assets/mango.png';
import nescafe from '../assets/nescafe.png';

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "Welcome to OneApp!",
    description: "Your all-in-one solution for store management, inventory tracking, and team coordination.",
    image: logo,
    color: "bg-gradient-to-br from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Smart Task Management",
    description: "Create, assign, and track tasks with ease. Use checklists for detailed task completion.",
    image: location,
    color: "bg-gradient-to-br from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Real-time Analytics",
    description: "Get insights into store performance, customer journey, and staff productivity.",
    image: kurta,
    color: "bg-gradient-to-br from-orange-500 to-red-600"
  },
  {
    id: 4,
    title: "Digital Registers",
    description: "Manage visitor entries, staff purchases, and petty cash all in one place.",
    image: mango,
    color: "bg-gradient-to-br from-purple-500 to-pink-600"
  },
  {
    id: 5,
    title: "Inventory Management",
    description: "Scan SKUs, track stock levels, and manage product information seamlessly.",
    image: nescafe,
    color: "bg-gradient-to-br from-indigo-500 to-blue-600"
  }
];

const AppStories: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            // All stories completed, navigate to home
            navigate('/home');
            return prev;
          }
        }
        return prev + 2; // Progress by 2% every 100ms (5 seconds total per story)
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStoryIndex, navigate]);

  const handleSkip = () => {
    navigate('/home');
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      navigate('/home');
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex space-x-2">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ease-linear ${
                  index < currentStoryIndex ? 'bg-white' : 
                  index === currentStoryIndex ? 'bg-white' : 'bg-transparent'
                }`}
                style={{
                  width: index === currentStoryIndex ? `${progress}%` : 
                         index < currentStoryIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-10 text-white p-2"
      >
        <X size={24} />
      </button>

      {/* Story content */}
      <div className={`h-full ${currentStory.color} flex flex-col items-center justify-center p-8 text-white`}>
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <img 
              src={currentStory.image} 
              alt={currentStory.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{currentStory.title}</h1>
          <p className="text-lg opacity-90 leading-relaxed">{currentStory.description}</p>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStoryIndex === 0}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <ChevronLeft size={20} />
            </Button>
            
            <span className="text-sm opacity-75">
              {currentStoryIndex + 1} of {stories.length}
            </span>
            
            <Button
              onClick={handleNext}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentStoryIndex(index);
              setProgress(0);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentStoryIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppStories; 
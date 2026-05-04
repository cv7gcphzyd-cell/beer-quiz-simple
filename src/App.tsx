import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [step, setStep] = useState<'splash' | 'hero' | 'quiz' | 'result'>('splash');
  const [result, setResult] = useState<'budweiser' | 'corona' | 'kingfisher' | null>(null);

  const startQuiz = () => setStep('quiz');
  const finishQuiz = (beer: 'budweiser' | 'corona' | 'kingfisher') => {
    setResult(beer);
    setStep('result');
  };
  const restart = () => {
    setResult(null);
    setStep('hero');
  };

  const resultData = {
    budweiser: { name: "Budweiser", tag: "Bold & Social", video: "/assets/budweiser.mp4" },
    corona: { name: "Corona", tag: "Find Your Beach", video: "/assets/corona.mp4" },
    kingfisher: { name: "Kingfisher", tag: "The True Taste of India", video: "/assets/kingfisher.mp4" }
  };

  return (
    <div className="relative min-h-screen bg-darkbeer text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/assets/main-background.png')] bg-cover bg-center opacity-80" />

      <AnimatePresence mode="wait">
        {/* Splash Screen */}
        {step === 'splash' && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          >
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2 }} className="text-center">
              <div className="text-9xl mb-6">🍺</div>
              <h1 className="text-8xl font-black text-beer">POUR</h1>
            </motion.div>
          </motion.div>
        )}

        {/* Hero */}
        {step === 'hero' && (
          <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
              WHAT’S YOUR<br />
              <span className="text-beer">POUR</span> PERSONALITY?
            </h1>
            <motion.button 
              onClick={startQuiz}
              whileHover={{ scale: 1.1 }}
              className="mt-10 px-16 py-8 bg-beer text-darkbeer font-bold text-3xl rounded-full"
            >
              START THE QUIZ 🍺
            </motion.button>
          </div>
        )}

        {/* Quiz */}
        {step === 'quiz' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
            <div className="text-center max-w-xl">
              <h2 className="text-5xl font-bold mb-12">What's your ideal weekend?</h2>
              <div className="space-y-4">
                {["Party with friends", "Beach day", "Cricket match", "Chill at home"].map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => finishQuiz(i === 0 ? 'budweiser' : i === 1 ? 'corona' : 'kingfisher')}
                    className="block w-full bg-white/10 hover:bg-white/20 p-8 rounded-3xl text-2xl transition-all"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {step === 'result' && result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-70">
              <source src={resultData[result].video} type="video/mp4" />
            </video>
            <div className="relative z-10 text-center px-6">
              <h1 className="text-8xl font-black text-beer mb-4">{resultData[result].name}</h1>
              <p className="text-4xl mb-12">{resultData[result].tag}</p>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                onClick={restart}
                className="px-16 py-7 bg-beer text-darkbeer font-bold text-2xl rounded-full"
              >
                POUR AGAIN 🍺
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
